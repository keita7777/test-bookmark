// フォルダごとのブックマークを表示する画面
// ブックマークIDをパラメータで受け取る

import BookmarkList from "@/components/Bookmark/List";

export default function BookmarksByFolderPage({ params }: { params: { id: string } }) {
  return <BookmarkList folderId={params.id} />;
}
