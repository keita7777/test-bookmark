// フォルダー編集画面
// フォルダーIDをパラメータで受け取る

import FolderForm from "@/components/Form/FolderForm";
import { getFolderData } from "@/utils/db/fetchData";

export default async function EditFolderPage({ params }: { params: { id: string } }) {
  const folders = await getFolderData();

  return <FolderForm folderData={folders} folderId={params.id} />;
}
