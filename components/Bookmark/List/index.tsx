import BookmarkCard from "./Card";
import { getBookmarkData } from "@/utils/db/fetchData";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type Props = {
  folderId?: string;
  page: number;
};

const BookmarkList = async ({ folderId, page }: Props) => {
  const bookmarks: BookmarkWithMemo[] = await getBookmarkData({ folderId, page });

  return (
    <ul className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-4">
      {bookmarks && bookmarks.map((bookmark) => <BookmarkCard key={bookmark.id} bookmark={bookmark} />)}
    </ul>
  );
};
export default BookmarkList;
