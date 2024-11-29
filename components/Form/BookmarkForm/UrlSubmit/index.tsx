// 入力したURLからサイトの情報を取得する
// サイト情報の取得は「linkpreview API」を使用

import { getUrlInfo } from "@/utils/services/linkpreview";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoSend } from "react-icons/io5";

type Props = {
  url: string | null;
  setUrl: Dispatch<SetStateAction<string | null>>;
  setUrlData: (newUrlData: { title: string; image: string; url: string; description: string }) => void;
  setIsUrlSubmit: Dispatch<SetStateAction<boolean>>;
};

const UrlSubmit = ({ url, setUrl, setUrlData, setIsUrlSubmit }: Props) => {
  const [error, setError] = useState<string | null>(null);
  // URLからサイトのデータを取得
  const handleUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url) {
      const data = await getUrlInfo(url);
      if (data.error) {
        setError("サイト情報の取得に失敗しました");
        setIsUrlSubmit(false);
      } else {
        setError(null);
        setUrlData(data);
        setIsUrlSubmit(true);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleUrlSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="URLを入力してください"
          className="border border-black rounded-md p-2 flex-1 w-full"
          defaultValue={url || ""}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="bg-gray-400 px-4 rounded-md">
          <IoSend />
        </button>
      </form>
      {error && <p className="text-red-500 text-lg font-bold">{error}</p>}
    </>
  );
};
export default UrlSubmit;
