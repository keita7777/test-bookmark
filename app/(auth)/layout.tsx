// (auth)配下のページは認証フォームのみ表示

import { auth } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

export default async function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ログインしている場合はホーム画面に遷移させる
  const session = await auth();

  if (session?.user?.id) {
    redirect("/");
  }

  return (
    <div className="h-full min-h-screen">
      <main className="p-4 flex justify-center items-center">{children}</main>
    </div>
  );
}
