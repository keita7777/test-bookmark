import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  setIsDeleteClick: Dispatch<SetStateAction<boolean>>;
};

const FolderSettingMenu = ({ id, setIsDeleteClick }: Props) => {
  return (
    <div className="absolute right-8 md:-right-44 top-3/4 md:top-0 z-10 bg-gray-200 px-4 py-3 rounded-xl">
      <ul>
        <li className="mb-2">
          <Link href={`/edit-folder/${id}`} className="bg-white rounded-md px-4 py-2 block">
            フォルダ編集
          </Link>
        </li>
        <li>
          <button onClick={() => setIsDeleteClick(true)} className="bg-white rounded-md px-4 py-2">
            フォルダ削除
          </button>
        </li>
      </ul>
    </div>
  );
};
export default FolderSettingMenu;
