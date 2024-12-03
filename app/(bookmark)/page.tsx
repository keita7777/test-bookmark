// 全てのブックマークを表示する画面

import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { countBookmarks } from "@/utils/db/fetchData";

export default async function Home({ searchParams }: { searchParams: { page: string; query: string } }) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const query = searchParams.query ? searchParams.query : undefined;
  const bookmarkCount = await countBookmarks(query);

  return (
    <>
      <BookmarkList page={page} query={query} />
      <Pagenation bookmarkCount={bookmarkCount} currentPage={page} />
    </>
  );
}
