import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import prisma from "../prisma/prisma"
import { OAuthAccountAlreadyLinkedError } from "../custom-error"
import {config} from "dotenv"
import {SignInSchema} from "@/validators/signin.validator"

config({
  path: "./.env.local"
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********"
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

          if(!user.password){
            const oauthAccount = await prisma.user.findFirst({
              where: {
                id: user.id
              }
            })

            if(oauthAccount){
              throw new OAuthAccountAlreadyLinkedError('An account with this email is already linked with an OAuth provider.')
            }

            return null;
          }

          const passwordMatch = await bcrypt.compare(user.password, password);

          if(passwordMatch){
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }else{
            console.log("Password does not match.")
            return null;
          }
          
        }
        
        return null;
      },

    }),
    
  ],

  callbacks: {
    async jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token;
    },

    async session({session, token}){
      if(session.user){
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  
  secret: process.env.AUTH_SECRET
})