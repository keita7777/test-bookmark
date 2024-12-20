import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const folderId = searchParams.get("folderId");

  // リクエストヘッダーからユーザーIDを取得
  const userId = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!userId) {
    return NextResponse.json({ message: "ユーザーが見つかりません" }, { status: 400 });
  }

  try {
    const folders = await prisma.folders.findMany({
      // folderIdがある場合は特定のフォルダデータのみ取得
      where: {
        id: folderId || undefined,
        user_id: userId,
      },
      include: {
        parent_relation: true,
      },
    });

    return NextResponse.json({ message: "取得完了", folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!userId) {
    return NextResponse.json({ message: "ユーザーが見つかりません" }, { status: 400 });
  }

  try {
    const data = await req.json();

    // foldersテーブルにデータ挿入
    const folderResult = await prisma.folders.create({
      data: {
        user_id: userId,
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

export const PUT = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const folderId = searchParams.get("folderId");
  const data = await req.json();

  if (!folderId) {
    return NextResponse.json({ message: "更新失敗" }, { status: 500 });
  }

  try {
    // foldersテーブルを更新
    const folderResult = await prisma.folders.update({
      where: {
        id: folderId,
      },
      data: {
        user_id: data.userId,
        name: data.name,
      },
    });

    // folder_relationテーブルを更新
    await prisma.folder_relation.update({
      where: {
        id: folderId,
      },
      data: {
        id: folderResult.id,
        // 第1階層の場合parentFolderが存在しない
        parent_folder: data.parentFolder || null,
        level: data.folderLevel,
      },
    });

    // 変更前に親フォルダが存在した場合かつ、更新前の親フォルダが更新対象のフォルダ以外に子フォルダを持たない場合、hasChildをfalseに更新
    if (!data.currentParentFolderHasChildren && data.currentParentFolderId) {
      await prisma.folder_relation.update({
        where: {
          id: data.currentParentFolderId,
        },
        data: {
          hasChild: false,
        },
      });
    }

    // 更新後の親フォルダを設定した場合、かつ更新後の親フォルダが更新対象のフォルダ以外に子フォルダを持っていなかった場合
    // 更新後の親フォルダのfolder_relationデータのhasChildを更新
    if (!data.updateParentFolderHasChildren && data.parentFolder) {
      await prisma.folder_relation.update({
        where: {
          id: data.parentFolder,
        },
        data: {
          hasChild: true,
        },
      });
    }

    return NextResponse.json({ message: "更新完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "更新失敗", error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const folderId = searchParams.get("folderId");
  const data = await req.json();

  if (!folderId) {
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  }
  try {
    // 配下のフォルダをすべて削除する
    await prisma.folders.deleteMany({
      where: {
        id: {
          in: data.relatedFolders,
        },
      },
    });

    // 親フォルダが他に子フォルダを持たない場合hasChildをfalseにする
    if (!data.hasSiblingFolders) {
      await prisma.folder_relation.update({
        where: {
          id: data.parentFolderId,
        },
        data: {
          hasChild: false,
        },
      });
    }

    return NextResponse.json({ message: "削除完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "削除失敗", error }, { status: 500 });
  }
};
