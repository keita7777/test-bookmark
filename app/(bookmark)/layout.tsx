// (bookmark)配下のページにのみheaderを表示させる
// (auth)配下のページは認証フォームのみ表示

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>ヘッダー</header>
      <main>{children}</main>
    </div>
  );
}
