import prisma from "@/utils/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const folders = await prisma.folders.findMany({
      include: {
        parent_relation: true,
      },
    });

    return NextResponse.json({ message: "取得完了", folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};
