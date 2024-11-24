// 入力したURLからサイトの情報を取得する
// サイト情報の取得は「linkpreview API」を使用

import { getUrlInfo } from "@/utils/services/linkpreview";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { IoSend } from "react-icons/io5";

type Props = {
  url: string | null;
  setUrl: Dispatch<SetStateAction<string | null>>;
  setUrlData: (newUrlData: { title: string; image: string; url: string; description: string }) => void;
  setIsUrlSubmit: Dispatch<SetStateAction<boolean>>;
};

const UrlSubmit = ({ url, setUrl, setUrlData, setIsUrlSubmit }: Props) => {
  // URLからサイトのデータを取得
  const handleUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url) {
      const data = await getUrlInfo(url);
      setUrlData(data);
    }
    setIsUrlSubmit(true);
  };

  return (
    <form onSubmit={handleUrlSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="URLを入力してください"
        className="border border-black rounded-md p-2 flex-1"
        defaultValue={url || ""}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="bg-gray-400 px-4 rounded-md">
        <IoSend />
      </button>
    </form>
  );
};
export default UrlSubmit;
