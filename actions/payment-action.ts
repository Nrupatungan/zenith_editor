"use server"

import { auth } from "@/lib/next-auth/auth";
import prisma from "@/lib/prisma";

export async function paymentAction() {
    const session = await auth()

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
}