// ヘッダーの親コンポーネント
// PCは画面左、SPは画面上部に表示

import Link from "next/link";
import HeaderNav from "./HeaderNav";
import { getFolderData } from "@/utils/db/fetchData";

const Header = async () => {
  const folders = await getFolderData();

  return (
    <header className="flex justify-between md:flex-col shrink-0 bg-gray-500 w-full md:w-5/12 md:max-w-[500px] md:min-w-[350px] relative">
      <h1 className="text-base md:text-3xl pl-4 md:px-4 py-4 text-white font-bold flex justify-center items-center">
        <Link href="/">ブックマーク管理</Link>
      </h1>
      <HeaderNav folders={folders} />
    </header>
  );
};
export default Header;
