import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";

import prisma from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    maxAge: 3 * 24 * 60 * 60, // 3日間
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      id: "itinerary",
      name: "itinerary",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("メールアドレスとパスワードが存在しません");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("ユーザーが存在しません");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("パスワードが一致しません");
        }

        if (user) {
          return {
            ...user,
            id: user.id.toString(),
          };
        } else {
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "blog",
      name: "blog",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const { ADMIN_ID, ADMIN_PASSWORD } = process.env;
        const { id, password } = credentials || {
          id: "",
          password: "",
        };

        if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
          return {
            id: ADMIN_ID || "",
            role: "admin",
            email: id || null,
          };
        } else if (id !== ADMIN_ID) {
          throw new Error("IDが間違っています");
        } else if (password !== ADMIN_PASSWORD) {
          throw new Error("パスワードが間違っています");
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/memorybook",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
