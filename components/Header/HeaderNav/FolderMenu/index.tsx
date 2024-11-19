// ヘッダーのフォルダメニュー

import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import FolderTree from "./FolderTree";
import { FoldersDummyData } from "@/DummtData/types/folderType";
import { useState } from "react";

type Props = {
  folders: FoldersDummyData;
};

const FolderMenu = ({ folders }: Props) => {
  // 子フォルダのツリーを開閉する処理、FolderOpenButtonコンポーネントで使用
  // 各フォルダのIDと開閉状態を管理
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  // toggleFolderが発火するたびにフォルダIDと開閉状態が更新される
  // 初回クリック時はundefinedが反転されるので開閉状態はtrueとなる
  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div className="w-full p-2 md:p-0">
      <div className="bg-white rounded-md mb-4 border-2 border-black">
        <Link href="/create-folder" className="px-4 py-2 font-bold flex justify-center items-center gap-4">
          <FaPlus />
          新規フォルダ作成
        </Link>
      </div>
      <ul className="flex flex-col gap-5">
        <FolderTree folders={folders} openFolders={openFolders} toggleFolder={toggleFolder} />
      </ul>
    </div>
  );
};
export default FolderMenu;
