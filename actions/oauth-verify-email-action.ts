"use server";

import { prisma } from "@/lib/prisma";


export async function oauthVerifyEmailAction(email: string) {
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email,
            password: null,
            emailVerified: null
        },
        select: { id: true },
    })

    if(existingUser?.id){
        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                emailVerified: new Date()
            },
        })
    }
}