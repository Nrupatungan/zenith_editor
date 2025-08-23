"use server"

import { VerificationToken } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function createVerificationTokenAction(
    identifier: VerificationToken['identifier']
){
    const expires = new Date(Date.now() + 15 * 60 * 1000)
    const token = crypto.randomUUID();

    const newVerificationToken = await prisma.verificationToken.create({
        data: {
            expires,
            token,
            identifier
        }
    })

    return {token: newVerificationToken.token};
}