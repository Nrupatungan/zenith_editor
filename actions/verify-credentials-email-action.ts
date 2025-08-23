"use server"

import { VerificationToken } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function verifyCredentialsEmailAction(
    token: VerificationToken['token']
){
    const verificationToken = await prisma.verificationToken.findFirst({
        where: {
            token
        }
    })

    if(!verificationToken?.expires) return { success: false };

    if(new Date(verificationToken.expires) < new Date()) return { success: false };

    const existingUser = await prisma.user.findFirst({
        where: {
            email: verificationToken.identifier
        }
    })

    if(
        existingUser?.id &&
        !existingUser.emailVerified && 
        existingUser.email === verificationToken.identifier
    ){
        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                emailVerified: new Date()
            },
        })

        await prisma.verificationToken.update({
            where: {
                identifier_token: {
                    identifier: verificationToken.identifier,
                    token: verificationToken.token
                }
            },
            data: {
                expires: new Date()
            },
        })

        return { success: true };
    }else {
        return { success: false };
    }
}