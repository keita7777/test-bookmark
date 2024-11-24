// 入力内容をDBのbookmarksテーブルに保存する
// 新規作成の場合、UrlSubmitコンポーネントで取得したサイト情報が初期値として設定される
// 編集の場合、該当するブックマークの情報が初期値として設定される

import testImage from "@/DummtData/images/test-image.png";
import Image from "next/image";
import { bookmarkDummyType } from "@/DummtData/types/bookmarkType";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FolderWithRelation } from "@/types/folderType";
import { createBookmark } from "@/utils/db/fetchData";

type Props = {
  urlData: {
    title: string;
    image: string;
    url: string;
    description: string;
  };
  folderData: FolderWithRelation[];
  bookmarkData?: bookmarkDummyType;
};

const BookmarkSubmit = ({ urlData, folderData, bookmarkData }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  // フォルダメニューを選択するごとに、フォルダ階層を設定
  const [folder_level1, setFolder_level1] = useState<string | null>(null);
  const [folder_level2, setFolder_level2] = useState<string | null>(null);
  const [folder_level3, setFolder_level3] = useState<string | null>(null);

  // キャンセルボタンクリック時の処理
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  // 選択したフォルダをuseFormのselectedFolderの値に設定する
  useEffect(() => {
    if (folder_level3) {
      // 第3階層フォルダまで選択された場合
      setValue("selectedFolder", folder_level3);
    } else if (folder_level2) {
      // 第2階層フォルダまで選択された場合
      setValue("selectedFolder", folder_level2);
    } else if (folder_level1) {
      // 第1階層フォルダまで選択された場合
      setValue("selectedFolder", folder_level1);
    } else {
      // フォルダが選択されていない場合
      setValue("selectedFolder", null);
    }
  }, [folder_level1, folder_level2, folder_level3, setValue]);

  const onSubmit = async (data: FieldValues) => {
    // 第1階層のフォルダが選択されていない場合はエラーを表示
    if (!folder_level1) {
      setError("root", {
        message: "フォルダを選択してください",
      });
      return;
    }

    const { title, description, selectedFolder, memo } = data;

    // bookmarksテーブルにデータを挿入する処理を実行
    await createBookmark(urlData.url, title, description, selectedFolder, urlData.image, memo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {Object.entries(errors).map(
        ([key, error]) =>
          error?.message && (
            <p key={key} className="text-red-500 text-lg font-bold">
              {error.message?.toString()}
            </p>
          ),
      )}
      <div className="flex justify-center flex-col xl:flex-row items-start gap-4">
        <div className="relative w-full xl:w-[400px] h-[300px] xl:h-[250px]">
          <Image src={urlData?.image || testImage} fill alt="画像" />
        </div>
        <div className="flex flex-col gap-2 flex-1 w-full">
          <label htmlFor="" className="text-xl font-bold">
            タイトル
          </label>
          <input
            type="text"
            className="border border-black rounded-md p-2"
            defaultValue={bookmarkData?.title || urlData?.title || ""}
            {...register("title", { required: "タイトルを入力してください" })}
          />
          <label htmlFor="" className="text-xl font-bold">
            詳細
          </label>
          <textarea
            rows={5}
            className="border border-black rounded-md p-2"
            defaultValue={bookmarkData?.description || urlData?.description || ""}
            {...register("description")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">フォルダ</p>
        <div className="flex flex-col gap-4 p-6 border border-black rounded-md">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-xl font-bold">
              第1階層
            </label>
            <select
              name=""
              id=""
              className="border border-black rounded-md p-2"
              defaultValue={""}
              onChange={(e) => {
                setFolder_level1(e.target.value);
                setFolder_level2(null);
                setFolder_level3(null);
              }}
            >
              <option value="" disabled>
                フォルダを選択してください
              </option>
              {folderData
                // 第1階層のフォルダを抽出
                .filter((item) => item.parent_relation.level === "ONE")
                .map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>
          </div>
          {/* 第1階層のフォルダが選択されている、かつ選択されたフォルダに子フォルダが存在する場合に第2階層のメニューを表示 */}
          {folder_level1 && folderData.filter((item) => item.id === folder_level1)[0].parent_relation.hasChild ? (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-xl font-bold">
                第2階層
              </label>
              <select
                name=""
                id=""
                className="border border-black rounded-md p-2"
                onChange={(e) => {
                  setFolder_level2(e.target.value);
                  setFolder_level3(null);
                }}
              >
                <option disabled value="">
                  フォルダを選択してください
                </option>
                <option value="">設定しない</option>
                {folderData
                  // 第1階層のフォルダの子フォルダを抽出
                  .filter((item) => item.parent_relation.parent_folder === folder_level1)
                  .map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : null}
          {/* 第2階層のフォルダが選択されている、かつ選択されたフォルダに子フォルダが存在する場合に第3階層のメニューを表示 */}
          {folder_level2 && folderData.filter((item) => item.id === folder_level2)[0].parent_relation.hasChild ? (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-xl font-bold">
                第3階層
              </label>
              <select
                name=""
                id=""
                className="border border-black rounded-md p-2"
                onChange={(e) => setFolder_level3(e.target.value)}
              >
                <option disabled value="">
                  フォルダを選択してください
                </option>
                <option value="">設定しない</option>
                {folderData
                  // 第2階層のフォルダの子フォルダを抽出
                  .filter((item) => item.parent_relation.parent_folder === folder_level2)
                  .map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-xl font-bold">
          メモ
        </label>
        <textarea
          rows={5}
          className="border border-black rounded-md p-2"
          defaultValue={bookmarkData?.memo || ""}
          {...register("memo")}
        />
      </div>
      <div className="flex gap-6 justify-center items-center w-full xl:w-[400px] mx-auto">
        <button className="rounded-md bg-gray-300 w-1/2 text-xl font-bold py-2">
          {bookmarkData ? "更新" : "作成"}
        </button>
        <button onClick={handleCancel} className="rounded-md bg-gray-300 w-1/2 text-xl font-bold py-2">
          キャンセル
        </button>
      </div>
    </form>
  );
};
export default BookmarkSubmit;
