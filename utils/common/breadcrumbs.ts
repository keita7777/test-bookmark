// 自身のフォルダ名と親フォルダを取得する処理

import { getFolderData } from "../db/fetchData";

export const getBreadcrumbPath = async (id: string) => {
  const breadcrumb = {
    folderName: null,
    parentFolderName: null,
    grandParentFolderName: null,
  };

  // フォルダ名を取得しbreadcrumbのfolderNameに設定
  const folderData = await getFolderData(id);
  breadcrumb.folderName = folderData[0].name;
  // 親フォルダがない場合はbreadcrumbをreturnする
  if (!folderData[0].parent_relation.parent_folder) return breadcrumb;

  // 親フォルダのフォルダ名を取得しbreadcrumbのparentFolderNameに設定
  const parentFolderData = await getFolderData(folderData[0].parent_relation.parent_folder);
  breadcrumb.parentFolderName = parentFolderData[0].name;
  // 親フォルダがない場合はbreadcrumbをreturnする
  if (!parentFolderData[0].parent_relation.parent_folder) return breadcrumb;

  // さらに親フォルダのフォルダ名を取得しbreadcrumbのgrandParentFolderNameに設定
  const grandParentFolderData = await getFolderData(parentFolderData[0].parent_relation.parent_folder);
  breadcrumb.grandParentFolderName = grandParentFolderData[0].name;
  // 親フォルダがない場合はbreadcrumbをreturnする
  if (!grandParentFolderData[0].parent_relation.parent_folder) return breadcrumb;

  return breadcrumb;
};
