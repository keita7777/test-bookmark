import Image from "next/image";
import testImage from "@/DummtData/images/test-image.png";
import { bookmarkDummyType } from "@/DummtData/types/bookmarkType";
import SettingButton from "./SettingButton";

type Props = {
  bookmark: bookmarkDummyType;
};

const BookmarkCard = ({ bookmark }: Props) => {
  return (
    <li className="flex flex-col border border-black rounded-md p-3 relative gap-4">
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
      <div className="bg-gray-600 rounded-md p-3">
        <h3 className="text-white">メモ</h3>
        <p className="bg-white mt-2 p-2 rounded-md">{bookmark.memo}</p>
      </div>
    </li>
  );
};
export default BookmarkCard;
