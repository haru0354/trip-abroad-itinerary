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
  session: { strategy: "jwt" },

  //認証プロバイダーの設定
  providers: [
    // Google認証
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // メールアドレス認証
    CredentialsProvider({
      id: "itinerary",
      name: "itinerary",    
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },


      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("メールアドレスとパスワードが存在しません");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("ユーザーが存在しません");
        }

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

        return {
          id: user.id.toString(),
          role: "itineraryUser", 
        };
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
    signIn: "/travel_brochure",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
