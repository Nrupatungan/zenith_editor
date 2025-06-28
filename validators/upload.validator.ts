import {z} from 'zod';

const UploadFileSchema = z.object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(["image", "video"]),
    alt: z.string().optional(),
    objectUrl: z.string().url("A valid URL is required"),
});

export type UploadFileType = z.infer<typeof UploadFileSchema>;

export default UploadFileSchema;