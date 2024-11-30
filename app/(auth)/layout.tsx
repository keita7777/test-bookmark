// (auth)配下のページは認証フォームのみ表示

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full min-h-screen">
      <main className="p-4 flex justify-center items-center">{children}</main>
    </div>
  );
}
