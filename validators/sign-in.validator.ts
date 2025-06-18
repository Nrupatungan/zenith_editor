import {z} from "zod"

export const SignInSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
    password: z.string().min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\S]).*$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, can contain special characters")
})

export type SignInType = z.infer<typeof SignInSchema>