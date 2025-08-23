"use server"

import prisma from "@/lib/prisma";
import SignUpSchema, { SignUpType } from "@/validators/signup.validator";
import { typeToFlattenedError } from "zod";
import { createVerificationTokenAction } from "./create-verification-token-action";
import { sendSignupUserEmail } from "./mail/send-signup-user-email";
import bcrypt from "bcryptjs";

type Res =
  { success: true }
  | { success: false; error: typeToFlattenedError<SignUpType, string>; statusCode: 400 }
  | { success: false; error: string; statusCode: 409 | 500 }

export async function signupUserAction(values: SignUpType): Promise<Res>{
    const parsedCredentials = await SignUpSchema.safeParseAsync(values);

    if (!parsedCredentials.success) {
        return { success: false, error: parsedCredentials.error.flatten(), statusCode: 400 };
    }

    const {email, password, name} = parsedCredentials.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                emailVerified: true
            }
        });

        if(existingUser?.id){
            if(!existingUser?.emailVerified){
                const verificationToken = await createVerificationTokenAction(existingUser.email)

                await sendSignupUserEmail({
                    email: existingUser.email,
                    token: verificationToken.token
                })

                return {
                    success: false,
                    error: "User exists but not verified. Verification link resent",
                    statusCode: 409,
                };
            }else{
                return {
                    success: false,
                    error: "Email already exists",
                    statusCode: 409,
                };
            }
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        });

        const verificationToken = await createVerificationTokenAction(newUser.email)

        await sendSignupUserEmail({
            email: newUser.email,
            token: verificationToken.token
        })

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }
}