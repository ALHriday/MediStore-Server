import { betterAuth, optional } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from "./prisma";
import nodemailer from "nodemailer"
import { emailTemplete } from "../src/template/emailTemplate";

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
    trustedOrigins: [process.env.FRONTEND_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "CUSTOMER"
            },
            status: {
                type: "string",
                required: true,
                defaultValue: "ACTIVE"
            },
            phone: {
                type: "string",
                required: false,
            },
        }
    },
    session: {
        deferSessionRefresh: true
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                await transporter.sendMail({
                    from: '"MediStore" <medistore@gmail.com>',
                    to: user.email,
                    subject: "Verify Your Email!",
                    html: emailTemplete(url),
                });

            } catch (err) {
                console.error(err);
            }
        },
    },
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

