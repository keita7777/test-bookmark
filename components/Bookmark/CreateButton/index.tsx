// ブックマーク新規作成ボタン

import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const CreateButton = () => {
  return (
    <Link
      href="/create-bookmark"
      className="flex justify-center items-center gap-2 w-full xl:w-72 bg-gray-500 text-white mb-4 px-8 py-4 rounded-md text-2xl hover:bg-gray-400 hover:text-black duration-100"
    >
      <FaPlus />
      <span>ブックマーク作成</span>
    </Link>
  );
};
export default CreateButton;
