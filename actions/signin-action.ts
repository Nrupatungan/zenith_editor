"use server";

import { signIn } from "@/lib/next-auth/auth";
import { SignInType } from "@/validators/signin.validator";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signinAction(formData: SignInType) {
    try {
      await signIn("credentials", {...formData, redirectTo: "/"});
    } catch (err) {
      console.error(err);
      if(isRedirectError(err)){
        throw err
      }
    }
}