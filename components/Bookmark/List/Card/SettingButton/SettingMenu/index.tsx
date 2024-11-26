import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  setIsDeleteClick: Dispatch<SetStateAction<boolean>>;
};

const SettingMenu = ({ id, setIsDeleteClick }: Props) => {
  return (
    <div className="absolute -right-0 top-full z-10 bg-gray-200 px-4 py-3 rounded-xl">
      <ul>
        <li className="mb-2">
          <Link href={`/edit-bookmark/${id}`} className="bg-white rounded-md px-4 py-2 block">
            ブックマーク編集
          </Link>
        </li>
        <li>
          <button onClick={() => setIsDeleteClick(true)} className="bg-white rounded-md px-4 py-2">
            ブックマーク削除
          </button>
        </li>
      </ul>
    </div>
  );
};
export default SettingMenu;
