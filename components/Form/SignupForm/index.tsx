"use client";

import { signupFormType } from "@/types/authType";
import { createUser } from "@/utils/auth/authFunctions";
import { signupSchema } from "@/validations/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: signupFormType) => {
    const res = await createUser(data);

    if (res?.error) {
      if (res.code === "P2002") {
        setError("email", {
          message: "このメールアドレスはすでに登録されています",
        });
      } else {
        setError("root", {
          message: "ユーザー登録に失敗しました",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 border border-black w-full max-w-[800px] px-4 md:px-20 py-6 rounded-md">
      {isSubmitSuccessful ? (
        <>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold">ユーザー登録が完了しました</h1>
            <Link className="underline hover:no-underline" href="/signin">
              ログイン
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl md:text-4xl font-bold">新規ユーザー登録</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            {errors["root"] && <p className="text-red-500 font-bold">{errors["root"].message}</p>}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">メールアドレス</label>
              <input
                className="border border-black rounded-md outline-none px-2 py-1"
                type="text"
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors["email"] && <p className="text-red-500 font-bold">{errors["email"].message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">ユーザー名</label>
              <input
                className="border border-black rounded-md outline-none px-2 py-1"
                type="text"
                {...register("username")}
                disabled={isSubmitting}
              />
              {errors["username"] && <p className="text-red-500 font-bold">{errors["username"].message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">パスワード</label>
              <input
                className="border border-black rounded-md outline-none px-2 py-1"
                type="password"
                {...register("password")}
                disabled={isSubmitting}
              />
              {errors["password"] && <p className="text-red-500 font-bold">{errors["password"].message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="passwordConfirm">パスワード確認</label>
              <input
                className="border border-black rounded-md outline-none px-2 py-1"
                type="password"
                {...register("passwordConfirm")}
                disabled={isSubmitting}
              />
              {errors["passwordConfirm"] && (
                <p className="text-red-500 font-bold">{errors["passwordConfirm"].message}</p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-blue-600 text-white rounded-md w-full max-w-[200px] hover:bg-blue-500 p-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "送信中" : "登録"}
              </button>
            </div>
          </form>
          <hr className="w-full border-black" />
          <div className="flex flex-col justify-center items-center gap-2">
            <p>すでにアカウントをお持ちの場合はログインしてください</p>
            <Link className="underline hover:no-underline" href="/signin">
              ログイン
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default SignupForm;
