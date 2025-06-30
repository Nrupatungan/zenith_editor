import { Object } from "@/app/generated/prisma";
import { auth } from "@/lib/next-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type bodyType = Omit<Object, "createdAt" | "updatedAt" | "id">

export async function GET(){
    try {
        const objects = await prisma.object.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        if(!objects || objects.length === 0){
            return NextResponse.json(
                [],
                {status: 200}
            )
        }

        return NextResponse.json(objects, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch objects"},
            {status: 500}
        )
    }
}

export async function POST(request: NextRequest){
    const body:bodyType  = await request.json();
    if(!body.objectUrl || !body.title || !body.type || !body.fileId || !body.userId){
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