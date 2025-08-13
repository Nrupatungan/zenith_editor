"use server"

import { auth } from "@/lib/next-auth/auth";
import prisma from "@/lib/prisma";

type Res = 
  { success: true; }
| { success: false; error: string; statusCode: 401 | 500 };

export async function paymentAction(): Promise<Res>{
    const session = await auth()

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: session?.user?.email!,
                isPremium: false
            },
            select: { id: true }
        })
    
        if(existingUser?.id){
            await prisma.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    isPremium: true
                },
            })
        }

        return { success: true };
    } catch (error) {
        console.error("Update error:", error);
        return {
            success: false,
            error: "Internal Server Error",
            statusCode: 500,
        };
    }
}