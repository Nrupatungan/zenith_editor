import { Video } from "@/app/generated/prisma";
import { auth } from "@/lib/next-auth/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const videos = await prisma.video.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        if(!videos || videos.length === 0){
            return NextResponse.json(
                [],
                {status: 200}
            )
        }
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch videos"},
            {status: 500}
        )
    }
}

export async function POST(request: NextRequest){
    try {
        const session = await auth();
        if(!session){
            return NextResponse.json(
                {error: "Unauthorized"},
                {status: 401}
            )
        }

        const body: Video = await request.json();
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const {createdAt, updatedAt, ...bodyfields} = body;

        const videoData = {
            ...bodyfields,
            controls: body?.controls ?? true,
            transformationHeight: 1920,
            transformationWidth: 1080,
            transformationQuality: body?.transformationQuality ?? 100
        }

        const newVideo = await prisma.video.create({
            data: videoData
        })

        return NextResponse.json(newVideo);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 }
        );
    }
}