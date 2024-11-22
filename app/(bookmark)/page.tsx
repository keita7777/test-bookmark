// 全てのブックマークを表示する画面

import CreateButton from "@/components/Bookmark/CreateButton";
import BookmarkList from "@/components/Bookmark/List";

export default function Home() {
  return (
    <>
      <CreateButton />
      <BookmarkList />
    </>
  );
}
