// ブックマーク新規作成画面

import BookmarkForm from "@/components/Form/BookmarkForm";
import { getFolderData } from "@/utils/db/fetchData";

export default async function CreateBookmarkPage() {
  const folders = await getFolderData();

  return <BookmarkForm folderData={folders} />;
}
