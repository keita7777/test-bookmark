// ヘッダーのフォルダメニュー

import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import FolderTree from "./FolderTree";
import { useState } from "react";
import { FolderWithRelation } from "@/types/folderType";

type Props = {
  folders: FolderWithRelation[];
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
    <div className="w-full px-4 py-6 md:p-0">
      <div className="bg-white rounded-md mb-4 border-2 border-black hover:bg-gray-200">
        <Link href="/create-folder" className="px-4 py-2 font-bold flex justify-center items-center gap-4">
          <FaPlus />
          新規フォルダ作成
        </Link>
      </div>
      {folders.length > 0 ? (
        <ul className="flex flex-col gap-5">
          <FolderTree folders={folders} openFolders={openFolders} toggleFolder={toggleFolder} />
        </ul>
      ) : (
        <div className="text-black md:text-white">
          <p className="text-2xl font-bold text-center">フォルダがありません</p>
          <p className="text-xl">ブックマークを作成する前にフォルダを作成してください</p>
        </div>
      )}
    </div>
  );
};
export default FolderMenu;
