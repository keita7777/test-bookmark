import { pageSize } from "@/utils/common/pageSize";
import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const folderId = searchParams.get("folderId");
  const bookmarkId = searchParams.get("bookmarkId");
  const isCount = searchParams.get("count");
  const page = Number(searchParams.get("page"));

  // folderIdの子フォルダの配列を用意
  let childFolders: Array<string> = [];
  // folderIdの孫フォルダの配列を用意
  let grandchildFolders: Array<string> = [];
  // childFoldersとgrandchildFoldersを連結させる配列を用意
  let resultArray: Array<string> = [];

  try {
    if (folderId) {
      // folderIdをparent_folderとして持つ子フォルダを取得
      const result = await prisma.folder_relation.findMany({
        where: {
          parent_folder: folderId,
        },
      });

      // 取得したフォルダデータのidを重複を削除して配列に格納
      childFolders = Array.from(new Set(result.map((item) => item.id)));

      const result2 = await prisma.folder_relation.findMany({
        where: {
          parent_folder: {
            in: childFolders,
          },
        },
      });

      grandchildFolders = Array.from(new Set(result2.map((item) => item.id)));

      resultArray = Array.from(new Set([...childFolders, ...grandchildFolders]));

      resultArray.push(folderId);
    }

    if (isCount) {
      // ブックマークの件数を取得する
      const bookmarkCount = await prisma.bookmarks.count({
        where: {
          folder_id: {
            // folderIdがある場合は子フォルダ、孫フォルダを含めて取得する
            in: folderId ? resultArray : undefined,
          },
        },
      });

      return NextResponse.json({ message: "取得完了", bookmarkCount }, { status: 200 });
    } else {
      // ブックマークデータを取得する
      if (bookmarkId) {
        // bookmarkIdがある場合は特定のブックマークデータを取得
        const bookmarks = await prisma.bookmarks.findUnique({
          where: {
            id: bookmarkId,
          },
          include: {
            memo: true,
          },
        });
        return NextResponse.json({ message: "取得完了", bookmarks }, { status: 200 });
      } else {
        // bookmarkIdがない場合は指定したブックマークリストをfindManyで取得
        const bookmarks = await prisma.bookmarks.findMany({
          where: {
            id: bookmarkId || undefined,
            folder_id: {
              // folderIdがある場合は子フォルダ、孫フォルダを含めて取得する
              in: folderId ? resultArray : undefined,
            },
          },
          include: {
            memo: true,
          },
          take: pageSize,
          skip: page !== 1 ? (page - 1) * 6 : undefined,
        });
        return NextResponse.json({ message: "取得完了", bookmarks }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
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

export const PUT = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const bookmarkId = searchParams.get("bookmarkId");
  const data = await req.json();

  try {
    const res = await prisma.bookmarks.update({
      where: {
        id: bookmarkId!,
      },
      data: {
        user_id: data.userId,
        folder_id: data.folder_id,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
      },
      include: { memo: true },
    });

    // メモが空白で渡された場合、かつメモが登録されている場合
    // bookmark_memoテーブルからデータを削除する
    if (data.memo === "" && res.memo) {
      await prisma.bookmark_memo.delete({
        where: {
          id: res.id,
        },
      });
    }

    // メモが更新された場合
    if (res.memo !== data.memo) {
      if (res.memo) {
        // メモがすでに登録されていた場合は更新する
        await prisma.bookmark_memo.update({
          where: {
            id: res.id,
          },
          data: {
            memo: data.memo,
          },
        });
      } else {
        // メモが登録されていない場合は新規作成する
        await prisma.bookmark_memo.create({
          data: {
            id: res.id,
            memo: data.memo,
          },
        });
      }
    }

    return NextResponse.json({ message: "更新完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "更新失敗", error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const bookmarkId = searchParams.get("bookmarkId");
  if (!bookmarkId) {
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  }
  try {
    await prisma.bookmarks.delete({
      where: {
        id: bookmarkId,
      },
    });

    return NextResponse.json({ message: "削除完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "削除失敗", error }, { status: 500 });
  }
};
