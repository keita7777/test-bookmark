// (bookmark)配下のページにのみheaderを表示させる
// (auth)配下のページは認証フォームのみ表示

import Header from "@/components/Header";
import { OpenMenuProvider } from "@/context/OpenMenuContext";
import { auth } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

export default async function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ログインしていない場合は/signinページに遷移させる
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen">
      <OpenMenuProvider>
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </OpenMenuProvider>
    </div>
  );
}
