// フォルダごとのブックマークを表示する画面
// ブックマークIDをパラメータで受け取る

// import Breadcrumb from "@/components/Bookmark/Breadcrumb";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { countBookmarks, getFolderData } from "@/utils/db/fetchData";
import { notFound } from "next/navigation";

export default async function BookmarksByFolderPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string; query: string };
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const query = searchParams.query ? searchParams.query : undefined;
  const bookmarkCount = await countBookmarks(params.id, query);

  // 無効なURLの場合not-foundページを表示させる
  const folderData = await getFolderData(params.id);
  if (folderData.length <= 0) {
    notFound();
  }

  return (
    <>
      {/* <Breadcrumb id={params.id} /> */}
      <BookmarkList folderId={params.id} page={page} query={query} />
      <Pagenation bookmarkCount={bookmarkCount} currentPage={page} />
    </>
  );
}
