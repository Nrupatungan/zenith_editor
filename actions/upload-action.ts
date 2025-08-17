"use server"

import prisma from "@/lib/prisma";
import { UploadFileType } from "@/validators/upload.validator";

type Res = 
  {success: true}
| { success: false; error: string; statusCode: 401 | 500 };

export async function uploadAction(formData: UploadFileType): Promise<Res>{

    try {
        // Validate required fields
        const { title, alt, userId, objectUrl } = formData;

        if (!title || !userId || !objectUrl ) {
            return {
            success: false,
            error: "Missing required fields",
            statusCode: 401,
            };
        }
    
        // Create the object in your database
        await prisma.object.create({
            data: {
            title,
            alt: alt ?? null,
            userId,
            objectUrl,
            },
        });

        return { success: true };
    } catch (err) {
        console.error("UploadAction error:", err);
        return {
            success: false,
            error: "Internal Server Error",
            statusCode: 500,
        };
    }
}