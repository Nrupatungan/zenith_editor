import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "../prisma/prisma"
import { SignInSchema } from "@/validators/sign-in.validator"
import { OAuthAccountAlreadyLinkedError } from "../custom-error"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
        const parsedCredentials = SignInSchema.safeParse(credentials);

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
            // Return the full user object as required by NextAuth (including password)
            const { password: _, ...userWithoutPassword } = user;
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
  
})