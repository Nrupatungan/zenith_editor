"use server";

import { signIn } from "@/lib/next-auth/auth";
import { SignInType } from "@/validators/signin.validator";
import { AuthError } from "next-auth";

type Res = 
  {success: true}
| { success: false; error: string; statusCode: 401 | 500 };

export async function signinAction(formData: SignInType): Promise<Res>{
    try {
      await signIn("credentials", {...formData, redirect: false});
      return {success: true}
    } catch (err) {

      if(err instanceof AuthError){
        const error = err.type
        if(error === "CredentialsSignin" || error === "CallbackRouteError"){
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401
          };
        }

        if(error === "AccessDenied"){
          return {
            success: false,
            error:
              "Please verify your email, sign up again to resend verification email",
            statusCode: 401,
          };
        }
      }

      console.error(err)
      return { success: false, error: "Internal Server Error", statusCode: 500 };
    }
}