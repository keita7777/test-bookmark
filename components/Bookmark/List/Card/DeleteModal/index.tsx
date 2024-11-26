import { deleteBookmark } from "@/utils/db/fetchData";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  id: string;
  setIsDeleteClick: Dispatch<SetStateAction<boolean>>;
};

const DeleteModal = ({ id, setIsDeleteClick }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // DeleteModalの要素がクリックされていない場合のみメニューを閉じる
      const target = event.target as HTMLElement;

      // クリックされた要素（event.target）が特定のクラス（.delete-modal）を持っていない場合メニューを閉じる
      if (!target.closest(".delete-modal")) {
        setIsDeleteClick(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="delete-modal flex justify-center items-center flex-col gap-4 w-full h-full bg-red-400 bg-opacity-80 absolute left-0 top-0 z-10">
      <p className="text-xl font-bold">本当に削除しますか？</p>
      <div className="min-w-72 flex gap-4">
        <button
          className="bg-red-700 rounded-md px-2 py-1 w-1/2 text-white hover:bg-red-600"
          onClick={async () => {
            await deleteBookmark(id);
            setIsDeleteClick(false);
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
