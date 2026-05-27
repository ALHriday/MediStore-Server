import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from "./prisma.js";
import nodemailer from "nodemailer"
import { emailTemplate } from "../template/emailTemplate.js";
import { oAuthProxy } from "better-auth/plugins";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_APP_USER!,
        pass: process.env.GOOGLE_APP_PASSWORD!,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.BETTER_AUTH_URL!,
    trustedOrigins: [process.env.FRONTEND_URL!],
    secret: process.env.BETTER_AUTH_SECRET!,
    account: {
        skipStateCookieCheck: true,
    },
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
        deferSessionRefresh: true,
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                await transporter.sendMail({
                    from: `"MediStore" <${process.env.GOOGLE_APP_USER!}>`,
                    to: user?.email,
                    subject: "Verify Your Email!",
                    html: emailTemplate(url),
                });

            } catch (err) {
                console.error(err);
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID! as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
        },
    },
    advanced: {
        useSecureCookies: true,
        defaultCookieAttributes: {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            partitioned: true,
        },
        crossSubDomainCookies: {
            enabled: true,
        },
    },
    plugins: [oAuthProxy()],
});

