// ブックマーク編集画面
// ブックマークIDをパラメータで受け取る

import BookmarkForm from "@/components/Form/BookmarkForm";
import { getBookmarkData, getFolderData } from "@/utils/db/fetchData";

export default async function EditBookmarkPage({ params }: { params: { id: string } }) {
  const folders = await getFolderData();
  const bookmark = await getBookmarkData(params.id);
  const bookmarkData = bookmark[0];

  return <BookmarkForm folderData={folders} bookmarkData={bookmarkData} />;
}
