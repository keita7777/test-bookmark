// ヘッダーメニューの切り替えボタン、メニュー
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaFolder, FaPlus, FaRegUserCircle, FaSearch } from "react-icons/fa";
import FolderMenu from "./FolderMenu";
import SearchMenu from "./SearchMenu";
import ProfileMenu from "./ProfileMenu";
import { FolderWithRelation } from "@/types/folderType";
import Link from "next/link";

type Props = {
  folders: FolderWithRelation[];
};

const HeaderNav = ({ folders }: Props) => {
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
    if (isSp) {
      // SP表示の場合
      if (switchMenu === id) {
        // 同じメニューをクリックした場合は閉じる
        setSwitchMenu("");
      } else {
        // 異なるメニューをクリックした場合は切り替える
        setSwitchMenu(id);
      }
    } else {
      // PC表示の場合は常にメニューを切り替える
      setSwitchMenu(id);
    }
  };

  const menuRef = useRef<HTMLDivElement>(null); // メニュー領域を参照する

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) && // メニュー領域外がクリックされた場合
        isSp // SP表示のときのみ
      ) {
        const clickedElement = e.target as HTMLElement;

        // メニューボタンがクリックされた場合は閉じない
        if (
          clickedElement.closest("button[title='フォルダメニュー']") ||
          clickedElement.closest("button[title='ブックマーク検索']") ||
          clickedElement.closest("button[title='ユーザーメニュー']")
        ) {
          return;
        }

        setSwitchMenu(""); // メニューを閉じる
      }
    },
    [isSp],
  );

  useEffect(() => {
    if (isSp) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSp, handleClickOutside]);

  return (
    <div className="h-full flex p-4 md:pt-0 gap-4">
      <div className="text-4xl">
        <nav>
          <ul className="flex md:flex-col justify-center items-center gap-2 md:gap-5 ">
            {folders.length > 0 && (
              <>
                <li className="rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 text-white">
                  <Link title="ブックマーク作成" href="/create-bookmark" className="p-2 flex">
                    <FaPlus className="text-2xl md:text-3xl" />
                  </Link>
                </li>
                <li className="hidden md:block h-1 w-full">
                  <hr className="block bg-white" />
                </li>
              </>
            )}

            <li
              className={`flex rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "folder" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button title="フォルダメニュー" onClick={() => handleSwitch("folder")} className="p-2">
                <FaFolder className="text-2xl md:text-3xl" />
              </button>
            </li>
            <li
              className={`flex rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "search" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button title="ブックマーク検索" onClick={() => handleSwitch("search")} className="p-2">
                <FaSearch className="text-2xl md:text-3xl" />
              </button>
            </li>
            <li
              className={`flex rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "profile" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button title="ユーザーメニュー" onClick={() => handleSwitch("profile")} className="p-2">
                <FaRegUserCircle className="text-2xl md:text-3xl" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div
        ref={menuRef}
        className="w-full md:pl-4 absolute md:static left-0 top-full bg-gray-300 md:bg-transparent md:border-l-2 border-white z-20"
      >
        <div className={`${switchMenu === "folder" ? "block" : "hidden"}`}>
          <FolderMenu folders={folders} />
        </div>
        <div className={`${switchMenu === "search" ? "block" : "hidden"}`}>
          <SearchMenu folders={folders} />
        </div>
        <div className={`${switchMenu === "profile" ? "block" : "hidden"}`}>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};
export default HeaderNav;
