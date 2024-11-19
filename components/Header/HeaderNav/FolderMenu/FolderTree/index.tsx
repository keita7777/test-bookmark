// フォルダを階層構造で表示させるコンポーネント

import { FoldersDummyData } from "@/DummtData/types/folderType";
import FolderItem from "./FolderItem";

type Props = {
  folders: FoldersDummyData;
  parentId?: string | null;
  openFolders: Record<string, boolean>;
  toggleFolder: (folderId: string) => void;
};

const FolderTree = ({ folders, parentId = null, openFolders, toggleFolder }: Props) => {
  return (
    folders
      // フォルダデータの親フォルダ（parent_folder）が受け取ったparentIdと一致するフォルダをフィルター
      // parentIdがない場合は親フォルダが存在しないフォルダ（第1階層のフォルダ）を取得する
      .filter((folder) => folder.parent_relation.parent_folder === parentId)
      .map((folder) => (
        <li key={folder.id} className="flex flex-col gap-5">
          <FolderItem
            folder={folder}
            isSubFolderVisible={!!openFolders[folder.id]}
            toggleFolder={() => toggleFolder(folder.id)}
          />
          {/* フォルダに子フォルダがある場合、再帰的にFolderTreeを呼び出す */}
          {folder.parent_relation.hasChild && openFolders[folder.id] && (
            <ul className="ml-6 flex flex-col gap-5">
              <FolderTree
                folders={folders}
                parentId={folder.id}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
              />
            </ul>
          )}
        </li>
      ))
  );
};

export default FolderTree;
