import { z } from "zod";

const ProfileSchema = z.object({
    image: z.intersection(z.instanceof(Blob), z.instanceof(File)).optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional()
})

export type ProfileType = z.infer<typeof ProfileSchema>

export {
    ProfileSchema
}