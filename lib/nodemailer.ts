import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_SERVER_HOST,
    port: Number(process.env.NODEMAILER_SERVER_PORT),
    secure: true,
    auth: {
        type: "OAuth2",
        user: process.env.NODEMAILER_GOOGLE_SMTP_USER,
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        accessToken: process.env.NODEMAILER_GOOGLE_ACCESS_TOKEN,
        refreshToken: process.env.NODEMAILER_GOOGLE_REFRESH_TOKEN,
    }
})

export default transport