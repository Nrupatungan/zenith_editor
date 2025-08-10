import { Object } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type bodyType = Omit<Object, "createdAt" | "updatedAt" | "id">

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

export async function POST(request: NextRequest){
    const body:bodyType  = await request.json();
    if(!body.objectUrl || !body.title || !body.fileId || !body.userId){
        return NextResponse.json(
            { error: "Missing required field" },
            { status: 400 }
        );
    } 

    try {
        const newObject = await prisma.object.create({
            data: body
        }) 
        return NextResponse.json(newObject, {status: 200});
    } catch (error) {
        console.error("Object Creation failed:", error);
        return NextResponse.json(
            {error: "Failed to create object"},
            {status: 500}
        )
    }
}

export async function DELETE(request: NextRequest){
    const body: {id: string} = await request.json();
    if(!body.id){
        return NextResponse.json(
            { error: "Missing required field" },
            { status: 400 }
        );
    }

    try {
        const deletedObject = await prisma.object.delete({
            where: {
                id: body.id
            }
        })
        return NextResponse.json(deletedObject, {status: 200});
    } catch (error) {
        console.error("Object Deletion failed:", error);
        return NextResponse.json(
            { error: "Failed to delete object" },
            { status: 500 }
        );
    }
}