// ログインフォームのバリデーション

import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email({ message: "正しいメールアドレスを入力してください。" }),
  password: z.string().min(1, "パスワードを入力してください"),
});
