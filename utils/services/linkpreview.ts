// linkpreview APIでサイト情報を取得する処理

export const getUrlInfo = async (url: string) => {
  const data = { q: url };
  try {
    const response = await fetch("https://api.linkpreview.net", {
      method: "POST",
      headers: {
        "X-Linkpreview-Api-Key": process.env.NEXT_PUBLIC_LINKPREVIEW_APIKEY!,
      },
      mode: "cors",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return { message: "エラーが発生しました", error: true };
    }
    return response.json();
  } catch (error) {
    return { message: "エラーが発生しました", error };
  }
};
