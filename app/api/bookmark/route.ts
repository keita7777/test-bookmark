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
