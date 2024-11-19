// Level Enum
export enum Level {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
}

// FolderRelation 型
export interface FolderRelation {
  id: string; // FoldersのIDと一致
  parent_folder: string | null; // 親フォルダのID (nullの場合はルートフォルダ)
  hasChild: boolean; // 子フォルダが存在するか
  level: Level; // フォルダの階層レベル
}

// Folder 型
export interface Folder {
  id: string; // フォルダの一意のID
  user_id: string; // ユーザーの一意のID
  name: string; // フォルダ名
  created_at: Date; // 作成日時
  updated_at: Date; // 更新日時
  parent_relation: FolderRelation; // 関連するFolderRelation情報
}

// ダミーデータ用配列型
export type FoldersDummyData = Folder[];
