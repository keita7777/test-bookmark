// ブックマーク新規作成画面

import BookmarkForm from "@/components/Form/BookmarkForm";
import { foldersDummyData } from "@/DummtData/folderData";
import { FoldersDummyData } from "@/DummtData/types/folderType";

// DBのfoldersテーブルからデータを取得する
// テストデータなので一旦asアサーションで型定義
const folderData = foldersDummyData as FoldersDummyData;

export default function CreateBookmarkPage() {
  return (
    <>
      <BookmarkForm folderData={folderData} />
    </>
  );
}
