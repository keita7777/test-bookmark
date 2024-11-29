import BookmarkCard from "./Card";
import { getBookmarkData } from "@/utils/db/fetchData";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type Props = {
  folderId?: string;
  page: number;
};

const BookmarkList = async ({ folderId, page }: Props) => {
  const bookmarks: BookmarkWithMemo[] = await getBookmarkData({ folderId, page });

  if (!bookmarks) {
    return <p>ブックマークが取得できませんでした</p>;
  }

  return (
    <>
      {bookmarks.length > 0 ? (
        <ul className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-start items-center my-6">
          <p className="text-3xl">ブックマークはありません</p>
        </div>
      )}
    </>
  );
};
export default BookmarkList;
