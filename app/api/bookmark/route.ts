import prisma from "@/utils/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const bookmarks = await prisma.bookmarks.findMany({
      include: {
        memo: true,
      },
    });

    return NextResponse.json({ message: "取得完了", bookmarks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    // bookmarksテーブルにデータ挿入
    const result = await prisma.bookmarks.create({
      data: {
        user_id: data.userId,
        folder_id: data.folder_id,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });

    if (data.memo) {
      // bookmark_memoテーブルにデータ挿入
      await prisma.bookmark_memo.create({
        data: {
          id: result.id,
          memo: data.memo,
        },
      });
    }

    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};
