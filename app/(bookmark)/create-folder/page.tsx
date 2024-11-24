// フォルダー新規作成画面

import FolderForm from "@/components/Form/FolderForm";
import { getFolderData } from "@/utils/db/fetchData";

export default async function CreateFolderPage() {
  const folders = await getFolderData();

  return <FolderForm folderData={folders} />;
}
