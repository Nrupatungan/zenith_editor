import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.S3_BUCKET_SECRET_KEY!,
    },
    region: process.env.S3_BUCKET_REGION,
});

export default s3;