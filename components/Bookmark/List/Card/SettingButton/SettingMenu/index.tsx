import Link from "next/link";

type Props = {
  id: string;
};

const SettingMenu = ({ id }: Props) => {
  return (
    <div className="absolute -right-0 top-full z-10 bg-gray-200 px-4 py-3 rounded-xl">
      <ul>
        <li className="mb-2">
          <Link href={`/edit-folder/${id}`} className="bg-white rounded-md px-4 py-2 block">
            ブックマーク編集
          </Link>
        </li>
        <li>
          <button className="bg-white rounded-md px-4 py-2">ブックマーク削除</button>
        </li>
      </ul>
    </div>
  );
};
export default SettingMenu;
