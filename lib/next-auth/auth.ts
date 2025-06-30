import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { OAuthAccountAlreadyLinkedError } from "../custom-error"
import {SignInSchema} from "@/validators/signin.validator"
import { prisma } from "../prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
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
  },
  
  secret: process.env.AUTH_SECRET
})