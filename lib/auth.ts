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
  trustedOrigins: ["http://192.168.253.1:3000"],
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
});

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
