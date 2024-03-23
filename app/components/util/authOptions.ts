import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/components/lib/prisma";

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
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
        const { username, password } = credentials || {
          username: "",
          password: "",
        };

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          return {
            id: ADMIN_USERNAME || "",
            role: "admin",
          };
        } else if (username !== ADMIN_USERNAME) {
          throw new Error("ユーザー名が間違っています");
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
  },
  pages: {
    signIn: "/memorybook",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
