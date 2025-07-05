import {z} from 'zod';

const SignUpSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().nonempty("Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\S]).*$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, can contain special characters"),
    name: z.string().max(32, "Username must be less than 32 characters.").nonempty("Username is required"),
    confirmPassword: z.string().min(8, "Password must be more than 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set the error on confirmPassword field
});

export type SignUpType = z.infer<typeof SignUpSchema>;

export default SignUpSchema;