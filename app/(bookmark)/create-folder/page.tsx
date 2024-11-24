// フォルダー新規作成画面

import FolderForm from "@/components/Form/FolderForm";
import { foldersDummyData } from "@/DummtData/folderData";
import { FoldersDummyData } from "@/DummtData/types/folderType";

export default function CreateFolderPage() {
  const folderData = foldersDummyData as FoldersDummyData;

  return <FolderForm folderData={folderData} />;
}
