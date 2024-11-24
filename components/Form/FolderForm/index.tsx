// 入力内容をDBのfoldersテーブルに保存する

"use client";

import { FolderWithRelation } from "@/types/folderType";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  folderData: FolderWithRelation[];
};

const FolderForm = ({ folderData }: Props) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      parentFolder: "",
    },
  });

  // キャンセルボタンクリック時の処理
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  const onSubmit = () =>
    // data: FieldValues
    {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 px-4 pt-12 pb-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl font-bold">
          フォルダ名
        </label>
        <input type="text" className="border border-black rounded-md p-2" {...register("name")} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="folder" className="text-xl font-bold">
          親フォルダを選択
        </label>
        <select
          className="border border-black rounded-md p-2"
          // defaultValue="75f2efe8-e3c2-441a-9190-27c94d740f47"
          {...register("parentFolder")}
        >
          <option value="">指定しない</option>
          {folderData &&
            folderData
              .filter(
                (folder) =>
                  // 第3階層のフォルダ以下には作成できない
                  folder.parent_relation.level !== "THREE",
              )
              .map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
        </select>
      </div>
      <div className="flex gap-6 justify-center items-center w-full xl:w-[400px] mx-auto">
        <button type="submit" className="rounded-md bg-gray-300 w-1/2 text-xl font-bold py-2">
          作成
        </button>
        <button type="button" onClick={handleCancel} className="rounded-md bg-gray-300 w-1/2 text-xl font-bold py-2">
          キャンセル
        </button>
      </div>
    </form>
  );
};
export default FolderForm;
