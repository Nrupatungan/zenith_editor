"use server";

import { signIn } from "@/lib/next-auth/auth";
import SignInSchema from "@/validators/signin.validator";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { z } from "zod/v4";

type SignInType = z.infer<typeof SignInSchema>

export async function signinAction(formData: SignInType) {
    try {
      await signIn("credentials", {...formData, redirectTo: "/" });
    } catch (err) {
      if (isRedirectError(err)) {
        throw err;
      }
  
      console.error(err);
    }
}