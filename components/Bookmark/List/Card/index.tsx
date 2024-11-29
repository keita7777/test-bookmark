import Image from "next/image";
import testImage from "@/DummtData/images/test-image.png";
import SettingButton from "./SettingButton";
import { BookmarkWithMemo } from "@/types/bookmarkType";
import { getBreadcrumbPath } from "@/utils/common/breadcrumbs";
import { BreadcrumbType } from "@/types/breadcrumbType";

type Props = {
  bookmark: BookmarkWithMemo;
};

const BookmarkCard = async ({ bookmark }: Props) => {
  const breadcrumb: BreadcrumbType = await getBreadcrumbPath(bookmark.folder_id);
  const breadcrumbKeys: (keyof BreadcrumbType)[] = ["grandParentFolderName", "parentFolderName", "currentFolder"];

  return (
    <li id={bookmark.id} className="flex flex-col border border-black rounded-md p-3 relative gap-4">
      <div className="flex justify-between items-center gap-4 relative">
        <p className="bg-blue-300 flex justify-start items-center px-2 py-1 rounded-md text-xs w-max">
          {breadcrumbKeys
            .filter((key) => breadcrumb[key]?.name)
            .map((key, index, array) => (
              <span key={key} className={`${index < array.length - 1 ? "after:content-['/'] after:mx-2" : ""}`}>
                {breadcrumb[key]?.name}
              </span>
            ))}
        </p>
        <SettingButton id={bookmark.id} />
      </div>
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
          <h2 className="text-xl font-bold">{bookmark.title}</h2>

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
