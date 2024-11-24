import BookmarkCard from "./Card";
import { getBookmarkData } from "@/utils/db/fetchData";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type Props = {
  folderId?: string;
};

// folderIdのpropsはデータフェッチで使用する予定
const BookmarkList = async ({ folderId }: Props) => {
  const bookmarks: BookmarkWithMemo[] = await getBookmarkData();

  return (
    <ul className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-4">
      {bookmarks && bookmarks.map((bookmark) => <BookmarkCard key={bookmark.id} bookmark={bookmark} />)}
      {folderId} {/* eslintエラー対策、一時的に記述 */}
    </ul>
  );
};
export default BookmarkList;
