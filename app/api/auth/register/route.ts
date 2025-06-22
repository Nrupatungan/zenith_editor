import prisma from "@/lib/prisma/prisma";
import { SignInSchema } from "@/validators/signin.validator";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(request: NextApiRequest) {
    const parsedCredentials = await SignInSchema.safeParseAsync(request.body);
    
    if(parsedCredentials.success){
        const {email, password} = parsedCredentials.data;

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) return NextResponse.json(
            {error: "User already registered"},
            {status: 400}
        );

       try {
         // create new user
         await prisma.user.create({
             data: {
                 email,
                 password
             }
         })

         return NextResponse.json(
            {error: "User registered successfully"},
            {status: 200}
         )

       } catch (error) {
         console.error("REGISTRATION ERROR: ",error);
         return NextResponse.json(
            {error: "Failed to register user"},
            {status: 400}
         )
       }

    }else{
        return NextResponse.json(
            {error: "Email and password should be non-empty and of right format"},
            {status: 400}
        )
    }
}