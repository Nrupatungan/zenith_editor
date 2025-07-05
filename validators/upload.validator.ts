import {z} from 'zod';

const UploadFileSchema = z.object({
    title: z.string().min(1, "Title is required"),
    alt: z.string().optional(),
    file: z.any(),
});

export type UploadFileType = z.infer<typeof UploadFileSchema>;

export default UploadFileSchema;