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

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    // foldersテーブルにデータ挿入
    const folderResult = await prisma.folders.create({
      data: {
        user_id: data.userId,
        name: data.name,
      },
    });

    // folder_relationテーブルにデータ挿入
    const folderRelationResult = await prisma.folder_relation.create({
      data: {
        id: folderResult.id,
        parent_folder: data.parentFolder,
        hasChild: false,
        level: data.folderLevel,
      },
    });

    // 親フォルダが設定されている場合、親フォルダのhasChildをtrueに更新する
    if (folderRelationResult.parent_folder) {
      // 親フォルダのhasChildをtrueに更新
      await prisma.folder_relation.update({
        where: {
          id: data.parentFolder,
        },
        data: {
          hasChild: true,
        },
      });
    }

    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};
