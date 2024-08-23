import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Extract callbacks from authConfig
const { callbacks: authConfigCallbacks, ...restAuthConfig } = authConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) return token;
      token.id = existingUser.id;
      token.role = existingUser.role;
      token.createdAt = existingUser.createdAt;
      token.updatedAt = existingUser.updatedAt;
      return token;
    },
    ...authConfigCallbacks, // Merge callbacks from authConfig
  },
  ...restAuthConfig, // Spread the rest of authConfig
});
