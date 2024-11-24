import { bookmarkDummyData } from "@/DummtData/bookmarkData";
import BookmarkCard from "./Card";

type Props = {
  folderId?: string;
};

// folderIdのpropsはデータフェッチで使用する予定
const BookmarkList = ({ folderId }: Props) => {
  const bookmarks = bookmarkDummyData;

  return (
    <ul className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-4">
      {bookmarks && bookmarks.map((bookmark) => <BookmarkCard key={bookmark.id} bookmark={bookmark} />)}
    </ul>
  );
};
export default BookmarkList;
