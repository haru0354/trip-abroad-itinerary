import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/app/components/lib/prisma";

//NextAuth設定
export const authOptions: NextAuthOptions = {
  //Prismaを使うための設定
  adapter: PrismaAdapter(prisma),
  //認証プロバイダーの設定
  providers: [
    // Google認証
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
    // メールアドレス認証
    CredentialsProvider({
      name: "credentials",
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

        //パスワードが一致しない場合はエラー
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("パスワードが一致しません");
        }
        return user;
      },     
    }),
    
    CredentialsProvider({
      id: 'app2',
      name: 'App 2',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
        const { username, password } = credentials || {};
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          return { id: ADMIN_USERNAME || '', name: ADMIN_USERNAME || '' }; // idが必須なので、undefinedの場合は空文字列になるように設定
        } else if (username !== ADMIN_USERNAME) {
          throw new Error("ユーザー名が間違っています");
        } else if (password !== ADMIN_PASSWORD) {
          throw new Error("パスワードが間違っています");
        } else {
          return null;
        }
      }
    }),

  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
