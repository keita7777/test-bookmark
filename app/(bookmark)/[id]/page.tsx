// フォルダごとのブックマークを表示する画面
// ブックマークIDをパラメータで受け取る

import Breadcrumb from "@/components/Bookmark/Breadcrumb";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { countBookmarks } from "@/utils/db/fetchData";

export default async function BookmarksByFolderPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const bookmarkCount = await countBookmarks(params.id);
  const page = searchParams.page ? Number(searchParams.page) : 1;

  return (
    <>
      <Breadcrumb id={params.id} />
      <BookmarkList folderId={params.id} page={page} />
      <Pagenation bookmarkCount={bookmarkCount} currentPage={page} />
    </>
  );
}
