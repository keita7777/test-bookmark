// フォルダメニューの各フォルダの設定ボタン（FolderSettingButton）で使用
// 設定メニューが開いている場合に別の設定ボタンをクリックした場合
// 設定メニューが開いている場合にメニュー外をクリックした場合
// 最初に開いていたメニューを閉じる

"use client";

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";

type OpenMenuContextType = {
  openMenuId: string | null;
  setOpenMenuId: Dispatch<SetStateAction<string | null>>;
};

const OpenMenuContext = createContext<OpenMenuContextType | undefined>(undefined);

export const OpenMenuProvider = ({ children }: { children: ReactNode }) => {
  // 現在開いているメニューのIDを管理
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // 「メニュー外をクリックした場合にメニューを閉じる」処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // FolderSettingButtonの要素がクリックされていない場合のみメニューを閉じる
      const target = event.target as HTMLElement;

      // クリックされた要素（event.target）が特定のクラス（.setting-button）を持っていない場合メニューを閉じる
      if (!target.closest(".setting-button")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return <OpenMenuContext.Provider value={{ openMenuId, setOpenMenuId }}>{children}</OpenMenuContext.Provider>;
};

export const useOpenMenu = () => {
  const context = useContext(OpenMenuContext);
  if (!context) {
    throw new Error("OpenMenuProviderでラップされていません");
  }
  return context;
};
