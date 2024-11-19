// (bookmark)配下のページにのみheaderを表示させる
// (auth)配下のページは認証フォームのみ表示

import Header from "@/components/Header";
import { OpenMenuProvider } from "@/context/OpenMenuContext";

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row">
      <OpenMenuProvider>
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </OpenMenuProvider>
    </div>
  );
}
