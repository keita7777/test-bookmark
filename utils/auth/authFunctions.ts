import { z } from "zod";
import { hash } from "bcryptjs";
import { passwordMatchSchema } from "@/validations/passwordMatchSchema";
import prisma from "../db/db";

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

      // if (errorData.error.code === "P2002") {
      //   return {
      //     error: true,
      //     message: "このメールアドレスはすでに登録されています",
      //   };
      // } else {
      //   return {
      //     error: true,
      //     message: "ユーザー登録に失敗しました",
      //   };
      // }
    }
  } catch (error) {
    return {
      error: true,
      message: "ユーザー登録に失敗しました",
    };
  }
};
