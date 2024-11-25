import { Bookmark_memo, Bookmarks } from "@prisma/client";

export type BookmarkWithMemo = Bookmarks & { memo?: Bookmark_memo };
