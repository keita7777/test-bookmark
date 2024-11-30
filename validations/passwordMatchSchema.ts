// 新規ユーザー登録フォームの「パスワード」と「パスワード確認」の入力値が一致しているかをチェック

import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const passwordMatchSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "パスワードが一致しません",
      });
    }
  });
