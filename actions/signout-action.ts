"use server"

import { signOut } from "@/lib/next-auth/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signoutAction() {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
      if(isRedirectError(err)){
        throw err
      }
    }
}