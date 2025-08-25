"use server";

import prisma from "@/lib/prisma";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/validators/forgot-password.validator";
import { typeToFlattenedError } from "zod";
import { createVerificationTokenAction } from "./create-verification-token-action";
import { sendForgotPasswordEmail } from "./mail/send-forgot-password-email";


type Res =
  | { success: true }
  | { success: false; error: typeToFlattenedError<ForgotPasswordType, string>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function forgotPasswordAction(values: ForgotPasswordType): Promise<Res> {
  const parsedCredentials = await ForgotPasswordSchema.safeParseAsync(values);

  if (!parsedCredentials.success) {
    return { success: false, error: parsedCredentials.error.flatten(), statusCode: 400 };
  }

  const { email } = parsedCredentials.data

  try {
    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!existingUser?.id) return { success: true };

    if (!existingUser.password) {
      return {
        success: false,
        error: "This user was created with OAuth, please sign in with OAuth",
        statusCode: 401,
      };
    }

    const verificationToken = await createVerificationTokenAction(
      existingUser.email,
    );

    await sendForgotPasswordEmail({
      email: existingUser.email,
      token: verificationToken.token,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}