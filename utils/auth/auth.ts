import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/utils/db/db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // メールアドレスの入力をチェック
        if (!credentials?.email) {
          throw new Error("メールアドレスを入力してください");
        }

        // 入力されたメールアドレスでユーザーを取得する
        const user = await prisma.users.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          // userが見つからなかった場合はエラーを返す
          throw new Error("このメールアドレスは登録されていません");
        } else {
          // 入力されたパスワードとデータベース上のハッシュ化されたパスワードを比較する
          const passwordCorrect = await compare(credentials.password as string, user.password!);

          if (!passwordCorrect) {
            throw new Error("パスワードが間違っています");
          }

          // パスワードの比較が完了したらユーザーのidとemailを返す
          return {
            id: user.id,
            email: user.email,
          };
        }
      },
    }),
  ],
});
