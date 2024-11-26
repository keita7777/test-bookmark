import Link from "next/link";
import { usePathname } from "next/navigation";

import { GrBottomCorner } from "react-icons/gr";
import FolderOpenButton from "./FolderOpenButton";
import FolderSettingButton from "./FolderSettingButton";
import { useOpenMenu } from "@/context/OpenMenuContext";
import FolderSettingMenu from "./FolderSettingButton/FolderSettingMenu";
import { FolderWithRelation } from "@/types/folderType";
import { createPortal } from "react-dom";
import DeleteModal from "../../DeleteModal";
import { useState } from "react";

type Props = {
  folder: FolderWithRelation;
  folderData: FolderWithRelation[];
  isSubFolderVisible: boolean;
  toggleFolder: () => void;
};

const FolderItem = ({ folder, folderData, isSubFolderVisible, toggleFolder }: Props) => {
  // URLからIDを取得、folder.idと一致する場合にスタイルを変更する
  const path = usePathname();
  const folderPath = path.split("/")[1];

  const { openMenuId, setOpenMenuId } = useOpenMenu();

  const [isDeleteClick, setIsDeleteClick] = useState(false);

  return (
    <div className="flex items-center relative">
      {/* 親フォルダがある場合アイコンを表示 */}
      {folder.parent_relation.parent_folder !== null && (
        <GrBottomCorner size={30} className="mb-2 text-white rotate-90" />
      )}
      <div
        className={` rounded flex justify-between items-stretch flex-1  hover:bg-blue-100 ${
          folderPath === folder.id ? "bg-blue-100" : "bg-white"
        }`}
      >
        <div className="flex items-stretch flex-1">
          {/* 子フォルダがある場合は開閉ボタンを表示 */}
          {folder.parent_relation.hasChild && (
            <FolderOpenButton isSubFolderVisible={isSubFolderVisible} toggleFolder={toggleFolder} />
          )}
          <Link
            className={`flex-1 flex items-center w-full py-2 ${folder.parent_relation.hasChild || "px-4"}`}
            href={`/${folder.id}`}
          >
            {folder.name}
          </Link>
        </div>
        {/* フォルダの設定ボタン（フォルダ編集/フォルダ削除メニューの表示） */}
        <FolderSettingButton id={folder.id} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />
      </div>
      {openMenuId === folder.id && <FolderSettingMenu id={folder.id} setIsDeleteClick={setIsDeleteClick} />}

      {isDeleteClick &&
        createPortal(
          <DeleteModal
            id={folder.id}
            folderName={folder.name}
            hasChild={folder.parent_relation.hasChild}
            setIsDeleteClick={setIsDeleteClick}
            folderData={folderData}
          />,
          document.getElementById(folder.id)!,
        )}
    </div>
  );
};
export default FolderItem;
