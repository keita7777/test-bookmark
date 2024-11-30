"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const {
    handleSubmit,
    register,
    // setError,
    // setValue,
    // formState: { errors },
  } = useForm();

  const onSubmit = () =>
    // data: FieldValues
    {
      // console.log(data);
    };

  return (
    <div className="flex flex-col items-center gap-4 border border-black w-full max-w-[800px] px-4 md:px-20 py-6 rounded-md">
      <h1 className="text-2xl md:text-4xl font-bold">ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">メールアドレス</label>
          <input className="border border-black rounded-md outline-none px-2 py-1" type="text" {...register("email")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">パスワード</label>
          <input
            className="border border-black rounded-md outline-none px-2 py-1"
            type="password"
            {...register("password")}
          />
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-blue-600 text-white rounded-md w-full max-w-[200px] hover:bg-blue-500 p-1">
            ログイン
          </button>
        </div>
      </form>
      <hr className="w-full border-black" />
      <div className="flex flex-col justify-center items-center gap-2">
        <p>アカウントをお持ちでない場合はユーザー登録してください</p>
        <Link className="underline hover:no-underline" href="/signup">
          ユーザー登録
        </Link>
      </div>
    </div>
  );
};
export default SigninForm;
