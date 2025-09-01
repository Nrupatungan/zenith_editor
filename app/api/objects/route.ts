import { Prisma } from "@/app/generated/prisma";
import { auth } from "@/lib/next-auth/auth";
import prisma from "@/lib/prisma";
import s3 from "@/lib/s3-client";
import { getS3KeyFromUrl } from "@/lib/utils";
import UploadFileSchema from "@/validators/upload.validator";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // Pagination parameters
    const takeParam = searchParams.get("take");
    const skipParam = searchParams.get("skip");

    if(!id){
        return NextResponse.json(
            { error: "Missing required field" },
            { status: 400 }
        );
    }

    const take = takeParam ? parseInt(takeParam, 10) : undefined;
    const skip = skipParam ? parseInt(skipParam, 10) : undefined;

    // Validation for pagination parameters to ensure they are positive numbers
    if ((take !== undefined && isNaN(take)) || (skip !== undefined && isNaN(skip))) {
        return NextResponse.json(
            { error: "Invalid pagination parameters. 'take' and 'skip' must be numbers." },
            { status: 400 }
        );
    }

    try {
        const objects = await prisma.object.findMany({
            where: {
                userId: id
            },
            orderBy: {
                createdAt: "desc"
            },
            take: take,
            skip: skip,
        })
        
        return NextResponse.json(objects ?? [], {status: 200});
    } catch (error) {
        console.error("Failed to fetch objects:", error);
        return NextResponse.json(
            {error: "Failed to fetch objects"},
            {status: 500}
        )
    }
}

export async function POST(request: Request) {
    const session = await auth();
    const formData = await request.formData();

    const validationData: Record<string, any> = {};
    const formFields = ["title", "alt", "userId", "object"];
    formFields.forEach(field => {
        const value = formData.get(field);
        if (value) {
            validationData[field] = field === "object" ? (value as (Blob & File)) : (value as string);
        }
    });

    const parsedCredentials = await UploadFileSchema.safeParseAsync(validationData);

    if (!parsedCredentials.success) {
        return NextResponse.json(
            { error: "Invalid fields", details: parsedCredentials.error.flatten() },
            { status: 400 }
        );
    }

    const { title, alt, object } = parsedCredentials.data;
    
    const existingUser = await prisma.user.findFirst({
        where: {
            id: session?.user?.id,
        },
    });

    if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const fileObject = object;
    const arrayBuffer = await fileObject.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique S3 key
    const fileSuffix = crypto.randomBytes(3).toString("hex");
    const s3Key = `${fileSuffix}_${fileObject.name}`;
    let objectUrl: string;

    try {
        // Upload the new file to S3
        const putCommand = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: `imagekit/${s3Key}`,
            Body: buffer,
            ContentType: fileObject.type,
            ContentLength: fileObject.size
        });
        await s3.send(putCommand);
        
        // Set the public URL
        objectUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/${s3Key}`;
    } catch (error) {
        console.error("S3 upload error:", error);
        return NextResponse.json({ error: "Failed to upload file to S3" }, { status: 500 });
    }
    
    const dataToCreate: Prisma.ObjectCreateInput = {
        title: title,
        alt: alt,
        objectUrl: objectUrl,
        objects: {
            connect: {
                id: existingUser.id,
            },
        },
    };

    try {
        await prisma.object.create({
            data: dataToCreate,
        });

        return NextResponse.json({ message: "Successfully created object" }, { status: 200 });
    } catch (error) {
        console.error("Prisma create error:", error);
        return NextResponse.json({ error: "Failed to create object" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest){
    const { fileId }: { fileId: string} = await request.json();
    if(!fileId){
        return NextResponse.json(
            { error: "Missing required field" },
            { status: 400 }
        );
    }

    const existingObject = await prisma.object.findFirst({
        where: {
            fileId
        }
    })

    if(!existingObject){
        return NextResponse.json(
            { error: "No object found with this Id" },
            { status: 404 }
        );
    }

    try {
        const oldImageKey = getS3KeyFromUrl(existingObject.objectUrl, process.env.IMAGEKIT_URL_ENDPOINT!);
        if (oldImageKey) {
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: `imagekit/${oldImageKey}`,
            });
            await s3.send(deleteCommand);
        }
    } catch (error) {
        console.error("S3 delete operation error:", error);
        return NextResponse.json({ error: "Failed to perform S3 delete object operation" }, { status: 500 });
    }

    try {
        await prisma.object.delete({
            where: {
                fileId
            }
        })
        return NextResponse.json({ message: "Successfully deleted object" }, {status: 200});
    } catch (error) {
        console.error("Object Deletion failed:", error);
        return NextResponse.json(
            { error: "Failed to delete object" },
            { status: 500 }
        );
    }
}