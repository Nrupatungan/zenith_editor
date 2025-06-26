import { prisma } from "@/lib/prisma";
import SignUpSchema from "@/validators/signup.validator";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
    const body = await request.json();
    const parsedCredentials = await SignUpSchema.safeParseAsync(body);

    if(parsedCredentials.success){
        const {email, password, name} = parsedCredentials.data;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUser) return NextResponse.json(
            {error: "User already registered"},
            {status: 400}
        );

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            await prisma.user.create({
                data: { email, password: hashedPassword, name }
            });

            return NextResponse.json(
                {message: "User registered successfully"},
                {status: 200}
            );
        } catch (error) {
            console.error("REGISTRATION ERROR: ", error);
            return NextResponse.json(
                {error: "Failed to register user"},
                {status: 400}
            );
        }
    } else {
        return NextResponse.json(
            {error: "All fields should be non-empty and of right format"},
            {status: 400}
        );
    }
    }catch (error) {
        console.error("UNEXPECTED ERROR: ", error);
        return NextResponse.json(
            {error: "Unexpected server error"},
            {status: 500}
        );
    }
}