// ヘッダーメニューの切り替えボタン、メニュー
"use client";

import { useCallback, useEffect, useState } from "react";
import { FaFolder, FaRegUserCircle, FaSearch } from "react-icons/fa";
import FolderMenu from "./FolderMenu";
import SearchMenu from "./SearchMenu";
import ProfileMenu from "./ProfileMenu";

const HeaderNav = () => {
  // ボタンクリックで表示するメニュー切替
  const [switchMenu, setSwitchMenu] = useState("folder");

  // SP表示であるかを判定
  const [isSp, setIsSp] = useState(false);

  // SP表示でメニューを非表示にした後、PC表示に切り替えるとメニューが表示されない不具合の解消
  // useCallbackでメモ化し不要な再生成を防ぐ
  // 現在の画面幅を判定し、768px未満の場合にtrue、それ以外の場合にfalseを設定
  const updateIsSp = useCallback(() => {
    // 現在の表示がSP表示であるか判定
    const isCurrentlySp = window.innerWidth < 768;

    // SP表示に切り替わった場合、switchMenuを空にする
    if (isCurrentlySp && !isSp) {
      setSwitchMenu(""); // SP表示に切り替えたときメニューを非表示
    }

    // PC表示に切り替えた際にswitchMenuが空なら"folder"に設定
    if (!isCurrentlySp && switchMenu === "") {
      setSwitchMenu("folder");
    }

    setIsSp(isCurrentlySp);
  }, [isSp, switchMenu]);

  // コンポーネントマウント時、およびリサイズ時に実行
  useEffect(() => {
    window.addEventListener("resize", updateIsSp);
    updateIsSp();
    return () => window.removeEventListener("resize", updateIsSp);
  }, [updateIsSp]);

  const handleSwitch = (id: string) => {
    if (isSp && switchMenu === id) {
      // SP表示かつ同じメニューのボタンをクリックした場合
      // クリックしたメニューが既に開いている場合は閉じる（トグル）
      setSwitchMenu("");
    } else {
      // PC表示はトグルせずメニューを切り替える
      setSwitchMenu(id);
    }
  };

  return (
    <div className="h-full flex p-4 gap-4">
      <div className="text-4xl">
        <nav>
          <ul className="flex md:flex-col gap-3 md:gap-5 ">
            <li
              className={` rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "folder" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button onClick={() => handleSwitch("folder")} className="p-2">
                <FaFolder className="text-3xl" />
              </button>
            </li>
            <li
              className={`rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "search" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button onClick={() => handleSwitch("search")} className="p-2">
                <FaSearch className="text-3xl" />
              </button>
            </li>
            <li
              className={`rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "profile" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button onClick={() => handleSwitch("profile")} className="p-2">
                <FaRegUserCircle className="text-3xl" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* md:min-w-[300px] フォルダメニュー作成後に調整 */}
      <div className="w-full md:pl-4 absolute md:static left-0 top-full bg-gray-300 md:bg-transparent md:border-l-2 border-white z-20 md:min-w-[300px]">
        <div className={`${switchMenu === "folder" ? "block" : "hidden"}`}>
          <FolderMenu />
        </div>
        <div className={`${switchMenu === "search" ? "block" : "hidden"}`}>
          <SearchMenu />
        </div>
        <div className={`${switchMenu === "profile" ? "block" : "hidden"}`}>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};
export default HeaderNav;
