// 全てのブックマークを表示する画面

import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { countBookmarks } from "@/utils/db/fetchData";
import { notFound } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const bookmarkCount = await countBookmarks();
  const page = searchParams.page ? Number(searchParams.page) : 1;

  if (!bookmarkCount) {
    notFound();
  }

  return (
    <>
      <BookmarkList page={page} />
      <Pagenation bookmarkCount={bookmarkCount} currentPage={page} />
    </>
  );
}
