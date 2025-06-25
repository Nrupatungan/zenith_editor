"use server";

import { signIn } from "@/lib/next-auth/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";


export async function oauthSigninAction(provider: "google" | "github") {
    try {
      await signIn(provider, {redirectTo: "/"});
    } catch (err) {
      console.error(err);
      if(isRedirectError(err)){
        throw err
      }
    }
}