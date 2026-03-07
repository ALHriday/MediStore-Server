import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from "./prisma";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_APP_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL!],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            // console.log("User: ", user);
            // console.log(`Email Verification Sent At : ${url}`);
            // const emailVerificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;
            // console.log("Email-Verify", emailVerificationUrl);
            try {
                const info = await transporter.sendMail({
                    from: '"MediStore" <medistore@gmail.com>',
                    to: "alauddinhriday@gmail.com",
                    subject: "Email Verification From MediStore.",
                    html: `
                <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:30px 0;">
<tr>
<td align="center">

<table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.08);background:#6708E4">

<h1 style="margin-bottom:10px;color:#FFFFFF;background:#A32ACF;font-size:40px;padding:10px">Medi-Store</h1>
<tr>
<td>

<h2 style="margin-bottom:10px;color:#FFFFFF;">Verify Your Email</h2>

<p style="color:#FFFFFF;font-size:14px;margin-bottom:30px;">
Thanks for signing up. Please confirm your email address by clicking the button below.
</p>

<a href="${url}" 
style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;display:inline-block;font-weight:700;">
Verify Email
</a>

<p style="margin-top:30px;color:#FFFFFF;font-size:12px;">
If you did not create this account, you can safely ignore this email.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
                `,
                });
                console.log(info.messageId);
            } catch (err) {
                console.log(err)
            }
        },
    },
    baseURL: process.env.APP_URL,
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

