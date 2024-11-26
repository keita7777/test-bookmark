import Image from "next/image";
import testImage from "@/DummtData/images/test-image.png";
import SettingButton from "./SettingButton";
import { BookmarkWithMemo } from "@/types/bookmarkType";
import { getBreadcrumbPath } from "@/utils/common/breadcrumbs";

type Props = {
  bookmark: BookmarkWithMemo;
};

const BookmarkCard = async ({ bookmark }: Props) => {
  const folderData: Record<string, string | null> = await getBreadcrumbPath(bookmark.folder_id);

  return (
    <li id={bookmark.id} className="flex flex-col border border-black rounded-md p-3 relative gap-4">
      <p className="bg-blue-300 flex justify-start items-center px-2 py-1 rounded-md text-xs w-max">
        {["grandParentFolderName", "parentFolderName", "folderName"]
          .filter((key) => folderData[key])
          .map((key, index, array) => (
            <span key={key} className={`${index < array.length - 1 ? "after:content-['/'] after:mx-2" : ""}`}>
              {folderData[key]}
            </span>
          ))}
      </p>
      <div className="flex flex-col xl:flex-row">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full xl:w-[300px] h-[300px] xl:h-[200px]"
        >
          <Image src={bookmark.image || testImage} fill alt="画像" />
        </a>
        <div className="flex flex-col gap-2 w-full xl:ml-5">
          <div className="flex justify-between relative">
            <h2 className="text-xl font-bold">{bookmark.title}</h2>
            <SettingButton id={bookmark.id} />
          </div>

          <p className="text-gray-600">{bookmark.description}</p>
        </div>
      </div>
      {bookmark.memo && (
        <div className="bg-gray-600 rounded-md p-3">
          <h3 className="text-white">メモ</h3>
          <p className="bg-white mt-2 p-2 rounded-md">{bookmark.memo.memo}</p>
        </div>
      )}
    </li>
  );
};
export default BookmarkCard;
