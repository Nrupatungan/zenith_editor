import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { authConfig } from "@/lib/next-auth/auth.config"
import { oauthVerifyEmailAction } from "@/actions/oauth-verify-email-action"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "@/validators/signin.validator"
import { OAuthAccountAlreadyLinkedError } from "../custom-error"
import bcrypt from "bcryptjs"
import prisma from "../prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials) {
        const parsedCredentials = await SignInSchema.safeParseAsync(credentials);

        if(parsedCredentials.success){
          const {email, password} = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: {
              email
            }
          })

          if(!user) return null;

          if(!user.password) throw new OAuthAccountAlreadyLinkedError();

          const passwordMatch = await bcrypt.compare(password, user.password);

          if(passwordMatch){
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }else{
            console.error("Password does not match.")
            return null;
          }
          
        }
        
        return null;
      },

    }),
  ],

  events: {
    async linkAccount({user, account}) {
      if(["google", "github"].includes(account.provider)){
        if(user.email) await oauthVerifyEmailAction(user.email)
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },

  session: {
    strategy: "jwt",
  },
  
  secret: process.env.AUTH_SECRET
})