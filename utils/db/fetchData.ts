// フォルダデータを取得する処理

export const getFolderData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("フォルダデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.folders;
};
