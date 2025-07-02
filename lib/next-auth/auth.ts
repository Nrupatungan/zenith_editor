import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { OAuthAccountAlreadyLinkedError } from "../custom-error"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {SignInSchema} from "@/validators/signin.validator"
import { prisma } from "../prisma"
import { oauthVerifyEmailAction } from "@/actions/oauth-verify-email-action"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({ 
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
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
    async jwt({token, user, trigger, session}){
      if(trigger === "update"){
        return {...token, ...session.user}
      }

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

    async signIn({user, account, profile}){
      if(account?.provider === "google"){
        return !!profile?.email_verified;
      }

      if(account?.provider === "github"){
        return true;
      }

      if(account?.provider === "credentials"){
        if ("emailVerified" in user && user.emailVerified) return true;
        return false;
      }

      return false;
    }
  },

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