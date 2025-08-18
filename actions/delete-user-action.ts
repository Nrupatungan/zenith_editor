"use server"

import { Object as PrismaObject } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import s3 from "@/lib/s3-client";
import { getS3KeyFromUrl } from "@/lib/utils";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";

type Res = 
  { success: true; }
| { success: false; error: string; statusCode: 401 | 500 };

export async function deleteUserAction(email: string): Promise<Res> {
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email },
            select: { id: true, objects: true, image: true }
        });

        if (!existingUser?.id) {
            return { success: true };
        }


        const objectKeys = existingUser.objects
            .map((obj: PrismaObject) => getS3KeyFromUrl(obj.objectUrl, process.env.IMAGEKIT_URL_ENDPOINT!));

        const imageKey = existingUser.image ? getS3KeyFromUrl(existingUser.image, process.env.IMAGEKIT_URL_ENDPOINT!) : null;

        // Filter out any null values.
        const s3ObjectsToDelete = [...objectKeys, imageKey]
            .filter((key): key is string => key !== null)
            .map(key => ({ Key: `imagekit/${key}` }));

        if (s3ObjectsToDelete.length > 0) {
            const deleteCommand = new DeleteObjectsCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Delete: {
                    Objects: s3ObjectsToDelete
                },
            });
            await s3.send(deleteCommand);
        }

        await prisma.user.delete({
            where: { id: existingUser.id }
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting user and their S3 objects:", error);
        
        return {
            success: false,
            error: "Internal Server Error",
            statusCode: 500,
        };
    }
}