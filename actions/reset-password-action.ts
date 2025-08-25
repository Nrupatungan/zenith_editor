"use server";

import { User, VerificationToken } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { ResetPasswordSchema, ResetPasswordType } from "@/validators/reset-password.validator";
import bcrypt from "bcryptjs";
import { typeToFlattenedError } from "zod";


type Res =
  | { success: true }
  | { success: false; error: typeToFlattenedError<ResetPasswordType, string>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function resetPasswordAction(
  email: User['email'],
  token: VerificationToken['token'],
  values: ResetPasswordType,
): Promise<Res> {

  const parsedCredentials = await ResetPasswordSchema.safeParseAsync(values);

  if (!parsedCredentials.success) {
    return { success: false, error: parsedCredentials.error.flatten(), statusCode: 400 };
  }

  const { password } = parsedCredentials.data

  const existingToken = await prisma.verificationToken.findFirst({
    where: {
        token
    }
  })

  if (!existingToken?.expires) {
    return {
      success: false,
      error: "Token is invalid",
      statusCode: 401,
    };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return {
      success: false,
      error: "Token is expired",
      statusCode: 401,
    };
  }

  const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    });

  if (
    !existingUser?.password ||
    existingUser.email !== existingToken.identifier
  ) {
    return {
      success: false,
      error: "Oops, something went wrong",
      statusCode: 401,
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: {
            email
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
}