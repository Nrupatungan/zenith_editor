"use server"

import prisma from "@/lib/prisma";

type Res = 
  { success: true; }
| { success: false; error: string; statusCode: 500 };

export async function deleteUserAction(email: string): Promise<Res> {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            },
            select: { id: true }
        })
    
        if(existingUser?.id){
            await prisma.user.delete({
                where: {
                    id: existingUser.id
                }
            })
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Internal Server Error",
            statusCode: 500,
        };
    }
}