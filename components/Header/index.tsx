// ヘッダーの親コンポーネント
// PCは画面左、SPは画面上部に表示

import Link from "next/link";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className="flex justify-between md:flex-col shrink-0 md:h-screen bg-gray-500 w-full md:w-auto relative">
      <h1 className="text-xl md:text-3xl px-4 py-4 text-white font-bold flex justify-center items-center">
        <Link href="/">ブックマーク管理</Link>
      </h1>
      <HeaderNav />
    </header>
  );
};
export default Header;
