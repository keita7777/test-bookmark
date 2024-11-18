// (bookmark)配下のページにのみheaderを表示させる
// (auth)配下のページは認証フォームのみ表示

import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row">
      <Header />
      <main>{children}</main>
    </div>
  );
}
