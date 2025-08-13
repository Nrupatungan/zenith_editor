import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ProfileSchema } from "@/validators/profile.validator";
import { auth } from "@/lib/next-auth/auth";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import { getS3KeyFromUrl } from "@/lib/utils";

export async function POST(request: Request) {
    const session = await auth();
    const formData = await request.formData();

    const validationData: Record<string, any> = {}; 
    const formFields = ["image", "name", "email", "location", "bio"];
    formFields.forEach(field => {
        const value = formData.get(field);
        if (value) {
            validationData[field] = field === "image" ? (value as (Blob & File)) : (value as string);
        }
    });

    const parsedCredentials = await ProfileSchema.safeParseAsync(validationData);
    
    if (parsedCredentials.error) {
        return NextResponse.json(
            { error: "Invalid fields", details: parsedCredentials.error.flatten()}, 
            { status: 400 }
        );
    }

    //Find the existing user
    const existingUser = await prisma.user.findFirst({
        where: {
            email: session?.user?.email!,
        },
        select: { id: true, image: true },
    });

    if (!existingUser) {
        return NextResponse.json({ error: "User not found"}, { status: 404 });
    }

    // Data object for Prisma update, only including present fields
    const dataToUpdate: Record<string, any> = {};
    if (parsedCredentials.data.name) dataToUpdate.name = parsedCredentials.data.name;
    if (parsedCredentials.data.email) dataToUpdate.email = parsedCredentials.data.email;
    if (parsedCredentials.data.location) dataToUpdate.location = parsedCredentials.data.location;
    if (parsedCredentials.data.bio) dataToUpdate.bio = parsedCredentials.data.bio;

    // Handle image upload and previous image deletion
    if (parsedCredentials.data.image) {
        const image = parsedCredentials.data.image;
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const s3 = new S3Client({
            credentials: {
                accessKeyId: process.env.S3_BUCKET_ACCESS_KEY!,
                secretAccessKey: process.env.S3_BUCKET_SECRET_KEY!,
            },
            region: process.env.S3_BUCKET_REGION,
        });
        
        const imageSuffix = crypto.randomBytes(6).toString("hex");
        const s3Key = `${imageSuffix}_${image.name}`;
        
        try {
            // Upload the new image
            const putCommand = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: `imagekit/${s3Key}`,
                Body: buffer,
                ContentType: image.type,
                ContentLength: image.size
            });
            await s3.send(putCommand);
            const imageUrl = `${process.env.NEXT_PUBLIC_URL_ENDPOINT}/${s3Key}`;
            dataToUpdate.image = imageUrl;

            // Delete the old image if it exists
            const oldImageKey = getS3KeyFromUrl(existingUser.image, process.env.NEXT_PUBLIC_URL_ENDPOINT!);
            if (oldImageKey) {
                const deleteCommand = new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME!,
                    Key: `imagekit/${oldImageKey}`,
                });
                await s3.send(deleteCommand);
            }

        } catch (error) {
            console.error("S3 operation error:", error);
            return NextResponse.json({ error: "Failed to perform S3 operations" }, { status: 500 });
        }
    }

    // Update the user profile with the conditional data
    try {
        await prisma.user.update({
            where: {
                id: existingUser.id,
            },
            data: dataToUpdate,
        });

        return NextResponse.json({ message: "Successfully updated user profile" }, { status: 200 });
    } catch (error) {
        console.error("Prisma update error:", error);
        return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
    }
}
