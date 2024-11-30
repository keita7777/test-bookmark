// ブックマークの新規作成/編集フォーム
// 編集の場合はbookmarkDataをpropsで受け取る

"use client";

import { useState } from "react";
import BookmarkSubmit from "./BookmarkSubmit";
import UrlSubmit from "./UrlSubmit";
import { FolderWithRelation } from "@/types/folderType";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type Props = {
  folderData: FolderWithRelation[];
  bookmarkData?: BookmarkWithMemo;
};

const BookmarkForm = ({ folderData, bookmarkData }: Props) => {
  // 入力されたURLを管理
  // 編集の場合、初期値に該当のブックマークのURLを設定
  const [url, setUrl] = useState(bookmarkData?.url || null);
  const [isUrlSubmit, setIsUrlSubmit] = useState(false);

  // UrlSubmitコンポーネントで取得したサイト情報を管理
  // UrlSubmitコンポーネントでsetし値をBookmarkSubmitコンポーネントに渡す
  // 編集時はDBのデータが設定される
  const [urlData, setUrlData] = useState({
    title: bookmarkData?.title || "",
    image: bookmarkData?.image || "",
    url: bookmarkData?.url || "",
    description: bookmarkData?.description || "",
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
    <div className="flex flex-col gap-8 md:px-4 pt-12 pb-4 max-w-7xl mx-auto">
      <UrlSubmit url={url} setUrl={setUrl} setUrlData={handleSetUrl} setIsUrlSubmit={setIsUrlSubmit} />
      {/* URLが送信された場合（新規作成）、bookmarkDataがある場合（編集）、BookmarkSubmitコンポーネントを表示 */}
      {(isUrlSubmit || bookmarkData) && (
        <BookmarkSubmit key={bookmarkKey} urlData={urlData} folderData={folderData} bookmarkData={bookmarkData} />
      )}
    </div>
  );
};
export default BookmarkForm;
