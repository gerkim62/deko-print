import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { nextCookies } from "better-auth/next-js";
import { UserRole } from "@prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.REGULAR,
        input: false,
        references: {
          model: "User",
          field: "role",
        },
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
  },
});

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
