import { Object } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type bodyType = Omit<Object, "createdAt" | "updatedAt" | "id">

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if(!id){
        return NextResponse.json(
            { error: "Missing required field" },
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
            }
        })

        return NextResponse.json(objects ?? [], {status: 200});
    } catch (error) {
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
        return NextResponse.json(
            { error: "Failed to delete object" },
            { status: 500 }
        );
    }
}