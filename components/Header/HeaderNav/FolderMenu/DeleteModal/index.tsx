import { FolderWithRelation } from "@/types/folderType";
import { deleteFolder } from "@/utils/db/fetchData";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  folderName: string;
  hasChild: boolean;
  setIsDeleteClick: Dispatch<SetStateAction<boolean>>;
  folderData: FolderWithRelation[];
};

const DeleteModal = ({ id, folderName, hasChild, setIsDeleteClick, folderData }: Props) => {
  const router = useRouter();

  // 子フォルダを取得
  const childFolders = folderData.filter((folder) => folder.parent_relation.parent_folder === id);

  // 孫フォルダを取得
  const grandChildFolders = childFolders.flatMap((folder) =>
    folderData.filter((item) => item.parent_relation.parent_folder === folder.id),
  );

  // 削除対象のフォルダ、子フォルダ、孫フォルダをrelatedFoldersにまとめる
  const relatedFolders = [...[...childFolders, ...grandChildFolders].map((item) => item.id), id];

  // 削除するフォルダと同階層のフォルダを取得
  const currentFolderData = folderData.find((folder) => folder.id === id);
  const parentFolderData = folderData.find((folder) => folder.id === currentFolderData?.parent_relation.parent_folder);
  const siblingFolders = folderData.filter(
    (folder) => folder.parent_relation.parent_folder === parentFolderData?.id && folder.id !== id,
  );
  // 同階層のフォルダを取得がある場合はtrue、ない場合はfalse
  const hasSiblingFolders = siblingFolders.length > 0 ? true : false;
  // 親フォルダのID
  const parentFolderId = parentFolderData?.id || null;

  return (
    <div className="delete-modal flex justify-start items-center flex-col gap-4 w-full h-full bg-red-800 bg-opacity-80 absolute left-0 top-0 pt-20 z-30 text-center">
      <p className="text-xl font-bold text-white">本当に「{folderName}」フォルダを削除しますか？</p>
      {hasChild && <p className="text-md font-bold text-white">※このフォルダ配下のフォルダも削除されます</p>}
      <div className="min-w-72 flex gap-4">
        <button
          className="bg-red-700 rounded-md px-2 py-1 w-1/2 text-white hover:bg-red-600"
          onClick={async () => {
            await deleteFolder(id, relatedFolders, hasSiblingFolders, parentFolderId);
            setIsDeleteClick(false);
            router.push("/");
            router.refresh();
          }}
        >
          削除
        </button>
        <button
          className="bg-white rounded-md px-2 py-1 w-1/2 hover:bg-slate-200"
          onClick={() => setIsDeleteClick(false)}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};
export default DeleteModal;
