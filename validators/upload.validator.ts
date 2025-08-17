import {z} from 'zod';

const UploadFileSchema = z.object({
    title: z.string().min(1, "Title is required"),
    alt: z.string().optional(),
    object: z.intersection(z.instanceof(Blob), z.instanceof(File))
});

export type UploadFileType = z.infer<typeof UploadFileSchema>;

export default UploadFileSchema;