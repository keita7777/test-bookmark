// FoldersとFolder_relationをまとめた型定義

import { Folder_relation, Folders } from "@prisma/client";

export type FolderWithRelation = Folders & { parent_relation: Folder_relation };
