"use server";

import { auth } from "@/lib/next-auth/auth";
import prisma from "@/lib/prisma";
import { ChangePasswordSchema, ChangePasswordType } from "@/validators/change-password.validator";
import bcrypt from "bcryptjs";
import { typeToFlattenedError } from "zod";


type Res =
  | { success: true }
  | { success: false; error: typeToFlattenedError<ChangePasswordType, string>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 | 404 | 402 };

export async function changePasswordAction(values: ChangePasswordType): Promise<Res>{
    try {
        const session = await auth();
        const parsedCredentials = await (ChangePasswordSchema).safeParseAsync(values);
    
        if (!parsedCredentials.success) {
            return { success: false, error: parsedCredentials.error.flatten(), statusCode: 400 };
        }
    
        const { oldPassword, newPassword } = parsedCredentials.data;
    
        const existingUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!
            },
            select: { password: true, email: true }
        })

        if(!existingUser){
            return {
                success: false,
                error: "User does not exist.",
                statusCode: 404,
            };
        }
    
    
        if(!existingUser.password){
            return {
                success: false,
                error: "Please sign in with Google or Github.",
                statusCode: 401,
            };
        }
    
        const passwordMatch = await bcrypt.compare(oldPassword, existingUser.password);
    
        if(!passwordMatch){
            return {
                success: false,
                error: "Your old password does not match",
                statusCode: 402,
            };
        }
    
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: {
                    email: existingUser.email
                },
                data: {
                    password: hashedPassword
                }
            })

            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, error: "Internal Server Error", statusCode: 500 };
        }

    } catch (error) {
        console.error(error);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }

}