"use server";

import { signIn } from "@/lib/next-auth/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";


export async function oauthSigninAction(provider: "google" | "github" | "facebook") {
    try {
      await signIn("facebook", { redirectTo: "/" });
    } catch (err) {
      if (isRedirectError(err)) {
        throw err;
      }
  
      console.error(err);
    }
}