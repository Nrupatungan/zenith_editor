"use server";

import { signIn } from "@/lib/next-auth/auth";
import { SignInType } from "@/validators/signin.validator";

export async function signinAction(formData: SignInType) {
    try {
      await signIn("credentials", {...formData, redirect: false});
      return true
    } catch (err) {
      console.error(err);
      throw err
    }
}