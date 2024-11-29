// 自身のフォルダと親フォルダの「名称」「id」を取得する処理

import { getFolderData } from "../db/fetchData";

export const getBreadcrumbPath = async (id: string) => {
  const breadcrumb = {
    currentFolder: {
      id: null,
      name: null,
    },
    parentFolderName: {
      id: null,
      name: null,
    },
    grandParentFolderName: {
      id: null,
      name: null,
    },
  };

  // フォルダ名を取得しbreadcrumbのfolderNameに設定
  const folderData = await getFolderData(id);

  if (!folderData || folderData.length <= 0) return breadcrumb;

  breadcrumb.currentFolder.id = folderData[0].id;
  breadcrumb.currentFolder.name = folderData[0].name;
  // 親フォルダがない場合はbreadcrumbをreturnする
  if (!folderData[0].parent_relation.parent_folder) return breadcrumb;

  // 親フォルダのフォルダ名を取得しbreadcrumbのparentFolderNameに設定
  const parentFolderData = await getFolderData(folderData[0].parent_relation.parent_folder);

  if (!parentFolderData) return breadcrumb;

  breadcrumb.parentFolderName.id = parentFolderData[0].id;
  breadcrumb.parentFolderName.name = parentFolderData[0].name;
  // 親フォルダがない場合はbreadcrumbをreturnする
  if (!parentFolderData[0].parent_relation.parent_folder) return breadcrumb;

  // さらに親フォルダのフォルダ名を取得しbreadcrumbのgrandParentFolderNameに設定
  const grandParentFolderData = await getFolderData(parentFolderData[0].parent_relation.parent_folder);

  if (!grandParentFolderData) return breadcrumb;

  breadcrumb.grandParentFolderName.id = grandParentFolderData[0].id;
  breadcrumb.grandParentFolderName.name = grandParentFolderData[0].name;
  // 親フォルダがない場合はbreadcrumbをreturnする
  if (!grandParentFolderData[0].parent_relation.parent_folder) return breadcrumb;

  return breadcrumb;
};
