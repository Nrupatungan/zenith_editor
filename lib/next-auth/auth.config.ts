import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

export const authConfig = {
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
    })
    
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

    async signIn({account, profile}){
      if(account?.provider === "google"){
        return !!profile?.email_verified;
      }
      
      if(account?.provider === "github"){
        return true;
      }

      if(account?.provider === "credentials"){
        // if ("emailVerified" in user && user.emailVerified) 
        return true;
      }

      return false;
    }
  },

} satisfies NextAuthConfig;