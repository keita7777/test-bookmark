"use server";

import { Level } from "@prisma/client";
import { auth } from "../auth/auth";

// sessionからユーザーIDを取得
const getUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  return userId;
};

// フォルダデータを取得する処理
export const getFolderData = async (id?: string) => {
  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder${id ? "?folderId=" + id : ""}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      // ヘッダーにユーザーIDを含める
      Authorization: "Bearer " + userId,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("フォルダデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.folders;
};

// ブックマークデータを取得する処理
// 引数がない場合は全件、ある場合は特定のブックマークを取得する
export const getBookmarkData = async ({
  folderId,
  bookmarkId,
  page,
  query,
}: {
  folderId?: string;
  bookmarkId?: string;
  page?: number;
  query?: string;
}) => {
  const params = new URLSearchParams();
  if (folderId) params.append("folderId", folderId);
  if (bookmarkId) params.append("bookmarkId", bookmarkId);
  if (page) params.append("page", page.toString());
  if (query) params.append("query", query);

  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?${params.toString()}
    `,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        // ヘッダーにユーザーIDを含める
        Authorization: "Bearer " + userId,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    console.error("ブックマークデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.bookmarks;
};

// ブックマークを新規作成する処理
export const createBookmark = async (
  url: string,
  title: string,
  description: string,
  folder_id: string,
  image: string | null | undefined,
  memo: string | null,
) => {
  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`, {
    method: "POST",
    headers: {
      // ヘッダーにユーザーIDを含める
      Authorization: "Bearer " + userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folder_id,
      url,
      title,
      description,
      image,
      memo,
    }),
  });

  if (!res.ok) {
    console.error("ブックマークの作成に失敗しました", res.statusText);
    return null;
  }
};

// フォルダを新規作成する処理
export const createFolder = async (name: string, parentFolder: string | null, folderLevel: Level) => {
  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder`, {
    method: "POST",
    headers: {
      // ヘッダーにユーザーIDを含める
      Authorization: "Bearer " + userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      parentFolder,
      folderLevel,
    }),
  });

  if (!res.ok) {
    console.error("フォルダの作成に失敗しました", res.statusText);
    return null;
  }
};

// ブックマークを更新する処理
export const updateBookmark = async (
  bookmarId: string,
  url: string,
  title: string,
  description: string,
  folder_id: string,
  image: string | null | undefined,
  memo: string | null,
) => {
  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?bookmarkId=${bookmarId}`, {
    method: "PUT",
    headers: {
      // ヘッダーにユーザーIDを含める
      Authorization: "Bearer " + userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folder_id,
      url,
      title,
      description,
      image,
      memo,
    }),
  });
};

// フォルダを更新する処理
export const updateFolder = async (
  folderId: string,
  currentParentFolderId: string | null,
  currentParentFolderHasChildren: boolean,
  updateParentFolderHasChildren: boolean,
  name: string,
  parentFolder: string | null,
  folderLevel: string,
) => {
  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder?folderId=${folderId}`, {
    method: "PUT",
    headers: {
      // ヘッダーにユーザーIDを含める
      Authorization: "Bearer " + userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentParentFolderId,
      currentParentFolderHasChildren,
      updateParentFolderHasChildren,
      name,
      parentFolder,
      folderLevel,
    }),
  });
};

// ブックマークを削除する処理
export const deleteBookmark = async (bookmarkId: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?bookmarkId=${bookmarkId}`, {
    method: "DELETE",
  });
};

// フォルダを削除する処理
export const deleteFolder = async (
  folderId: string,
  relatedFolders: Array<string>,
  hasSiblingFolders: boolean,
  parentFolderId: string | null,
) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder?folderId=${folderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relatedFolders,
      hasSiblingFolders,
      parentFolderId,
    }),
  });
};

// ブックマークの件数を取得する処理
export const countBookmarks = async (folderId?: string, query?: string) => {
  const userId = await getUserId();
  if (!userId) {
    console.error("ユーザーが見つかりません");
    return null;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?count=true${folderId ? `&folderId=${folderId}` : ""}${query ? `&query=${query}` : ""}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        // ヘッダーにユーザーIDを含める
        Authorization: "Bearer " + userId,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    console.error("ブックマーク件数の取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();

  return data.bookmarkCount;
};
