// ブックマーク編集画面
// ブックマークIDをパラメータで受け取る

import BookmarkForm from "@/components/Form/BookmarkForm";
import { getBookmarkData, getFolderData } from "@/utils/db/fetchData";

export default async function EditBookmarkPage({ params }: { params: { id: string } }) {
  const folders = await getFolderData();
  const bookmarkData = await getBookmarkData({ bookmarkId: params.id });

  return <BookmarkForm folderData={folders} bookmarkData={bookmarkData} />;
}
