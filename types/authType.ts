// 新規ユーザー登録フォームの型定義

export type signupFormType = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export type signinFormType = {
  email: string;
  password: string;
};
