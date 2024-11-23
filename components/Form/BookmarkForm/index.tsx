// ブックマークの新規作成/編集フォーム
// 編集の場合はbookmarkDataをpropsで受け取る

"use client";

import { useState } from "react";
import BookmarkSubmit from "./BookmarkSubmit";
import UrlSubmit from "./UrlSubmit";
import { bookmarkDummyType } from "@/DummtData/types/bookmarkType";
import { FoldersDummyData } from "@/DummtData/types/folderType";

type Props = {
  folderData: FoldersDummyData;
  bookmarkData?: bookmarkDummyType;
};

const BookmarkForm = ({ folderData, bookmarkData }: Props) => {
  // 入力されたURLを管理
  // 編集の場合、初期値に該当のブックマークのURLを設定
  const [url, setUrl] = useState(bookmarkData?.url || null);

  const [isUrlSubmit, setIsUrlSubmit] = useState(false);

  // UrlSubmitコンポーネントで取得したサイト情報を管理
  // UrlSubmitコンポーネントでsetし値をBookmarkSubmitコンポーネントに渡す
  const [urlData, setUrlData] = useState({
    title: "",
    image: "",
    url: "",
    description: "",
  });

  // URLを入力しなおした時の対策
  // UrlSubmitコンポーネントでsubmitするごとに、新しくBookmarkSubmitコンポーネントをレンダリングさせる
  const [bookmarkKey, setBookmarkKey] = useState(0);
  const handleSetUrl = (newUrlData: typeof urlData) => {
    setUrlData(newUrlData);
    setIsUrlSubmit(true);
    setBookmarkKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-8 px-4 pt-12 pb-4 max-w-7xl mx-auto">
      <UrlSubmit url={url} setUrl={setUrl} setUrlData={handleSetUrl} setIsUrlSubmit={setIsUrlSubmit} />
      {/* urlが存在する場合のみBookmarkSubmitコンポーネントを表示 */}
      {isUrlSubmit && (
        <BookmarkSubmit key={bookmarkKey} urlData={urlData} folderData={folderData} bookmarkData={bookmarkData} />
      )}
    </div>
  );
};
export default BookmarkForm;
