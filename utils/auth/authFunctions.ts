"use server";

import { z } from "zod";
import { hash } from "bcryptjs";
import { passwordMatchSchema } from "@/validations/passwordMatchSchema";
import { passwordSchema } from "@/validations/passwordSchema";
import { signIn } from "./auth";
import { AuthError } from "next-auth";

// 新規ユーザー登録処理
export const createUser = async ({
  email,
  username,
  password,
  passwordConfirm,
}: {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const newUserSchema = z
      .object({
        email: z.string().email().min(1),
        username: z.string().min(1),
      })
      .and(passwordMatchSchema);

    const newUserValidation = newUserSchema.safeParse({
      email,
      username,
      password,
      passwordConfirm,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.issues[0]?.message ?? "ユーザー登録に失敗しました",
      };
    }

    const hashedPassword = await hash(password, 10);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        hashedPassword,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();

      return {
        error: true,
        code: errorData.error.code,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "ユーザー登録に失敗しました",
    };
  }
};

// ログイン処理
export const loginWithCredentials = async ({ email, password }: { email: string; password: string }) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
  });

  const loginValidation = loginSchema.safeParse({
    email,
    password,
  });

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error?.issues[0]?.message ?? "ログインに失敗しました",
    };
  }

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res) {
      return {
        error: true,
        message: "認証に失敗しました。",
      };
    }
    if (res.error) {
      return {
        error: true,
        message: res.error,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: error instanceof AuthError ? error.cause?.err?.message : "認証に失敗しました。",
    };
  }
};
