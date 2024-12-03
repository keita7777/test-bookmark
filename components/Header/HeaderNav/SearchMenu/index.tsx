import { FolderWithRelation } from "@/types/folderType";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";

type Props = {
  folders: FolderWithRelation[];
};

const SearchMenu = ({ folders }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputError, setInputError] = useState(false);
  const router = useRouter();

  // URLからIDを取得
  const path = usePathname();
  const folderPath = path.split("/")[1];

  // 現在開いているフォルダページのIDをチェック
  // フォルダページ以外のページを開いている場合の対策
  let currentFolderId = null;
  const currentFolder = folders.filter((folder) => folder.id === folderPath);
  if (currentFolder.length > 0) {
    currentFolderId = currentFolder[0].id;
  }

  // 検索ボタンクリック時の処理
  const handleSearch = (e: any, query: string, folderId?: string | null) => {
    e.preventDefault();

    // 入力欄が空の場合エラーとする
    if (query === "") {
      setInputError(true);
      return null;
    }
    setInputError(false);

    const params = new URLSearchParams();
    params.set("query", query);
    if (folderId) {
      params.set("folderId", folderId);
      router.push("?" + params.toString());
    } else {
      router.push("/?" + params.toString());
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full px-4 py-6 md:p-0">
      {inputError && (
        <p className="flex justify-center items-center gap-2 text-white font-bold bg-red-600 bg-opacity-70 rounded-md p-1">
          <FaArrowDown />
          検索キーワードを入力してください
          <FaArrowDown />
        </p>
      )}
      <input
        type="text"
        placeholder="キーワードを入力"
        className="rounded-md outline-none p-2"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        {currentFolderId && (
          <button
            onClick={(e) => handleSearch(e, searchQuery, currentFolderId)}
            className="flex justify-center items-center gap-4 rounded-md bg-gray-100 p-2 hover:bg-gray-200 duration-100"
          >
            現在のフォルダから検索
            <FaSearch />
          </button>
        )}

        <button
          onClick={(e) => handleSearch(e, searchQuery)}
          className="flex justify-center items-center gap-4 rounded-md bg-gray-100 p-2 hover:bg-gray-200 duration-100"
        >
          全てのフォルダから検索
          <FaSearch />
        </button>
      </div>
    </form>
  );
};
export default SearchMenu;
