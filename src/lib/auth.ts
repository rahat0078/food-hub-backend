import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../../generated/prisma/enums";
import nodemailer from 'nodemailer';
import { UserStatus } from './../../generated/prisma/enums';


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, //Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});




export const auth = betterAuth({
  baseUrl: process.env.APP_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        options: Object.values(Role),
        defaultValue: Role.USER,
        required: false
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        options: Object.values(UserStatus),
        defaultValue: UserStatus.ACTIVE,
        required: false
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      try {
        const info = await transporter.sendMail({
          from: '"Food hub" <foodhub@gmail.com>',
          to: user.email,
          subject: "Verify your Foodhub account",
          html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
      </head>

      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 0;">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

                <tr>
                  <td style="background:#111827; padding:20px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:24px;">Food Hub</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:30px;">
                    <h2 style="color:#111827;">Verify your email address</h2>

                    <p style="color:#374151; font-size:15px; line-height:1.6;">
                      Thanks for signing up for <strong>Food Hub</strong>.
                      Please confirm your email address by clicking the button below.
                    </p>

                    <div style="text-align:center; margin:30px 0;">
                      <a
                        href="${verificationUrl}"
                        style="
                          background:#2563eb;
                          color:#ffffff;
                          text-decoration:none;
                          padding:12px 24px;
                          border-radius:6px;
                          display:inline-block;
                          font-weight:bold;
                        "
                      >
                        Verify Email
                      </a>
                    </div>

                    <p style="color:#6b7280; font-size:14px;">
                      If the button doesn’t work, copy and paste this link:
                    </p>

                    <p style="word-break:break-all; font-size:13px; color:#2563eb;">
                      ${verificationUrl}
                    </p>

                    <p style="color:#6b7280; font-size:13px; margin-top:30px;">
                      If you didn’t create an account, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#6b7280;">
                    © ${new Date().getFullYear()} Food Hub. All rights reserved.
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
      } catch (error: any) {
        console.error("Failed to send verification email", {
          userId: user.id,
          email: user.email,
          error: error?.message,
        });

        throw new Error("Verification email could not be sent");
      }
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {

          const body: any = ctx?.body;

          if (user.role === Role.PROVIDER) {

            const { restaurantName, address, phone, restaurantThumbnail } = body;

            if (!restaurantName || !address || !phone) {
              throw new Error("Provider must provide restaurant information");
            }

            await prisma.providerProfile.create({
              data: {
                userId: user.id,
                restaurantName,
                address,
                phone,
                restaurantThumbnail
              }
            });

          }

        }
      }
    }
  },

}); 