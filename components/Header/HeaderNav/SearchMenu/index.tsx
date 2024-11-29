import { FaSearch } from "react-icons/fa";

const SearchMenu = () => {
  return (
    <form className="flex flex-col gap-4 w-full px-4 py-6 md:p-0">
      <input type="text" placeholder="キーワードを入力" className="rounded-md outline-none p-2" />
      <div className="flex flex-col gap-2">
        <button className="flex justify-center items-center gap-4 rounded-md bg-gray-100 p-2 hover:bg-gray-200 duration-100">
          現在のフォルダから検索
          <FaSearch />
        </button>
        <button className="flex justify-center items-center gap-4 rounded-md bg-gray-100 p-2 hover:bg-gray-200 duration-100">
          全てのフォルダから検索
          <FaSearch />
        </button>
      </div>
    </form>
  );
};
export default SearchMenu;
