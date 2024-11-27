"use client";

import { pageSize } from "@/utils/common/pageSize";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  bookmarkCount: number;
  currentPage: number;
};

const Pagenation = ({ bookmarkCount, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // ページの総数（ブックマークの総数 / 1ページ表示させるブックマークの数）
  const pageCount = Math.ceil(bookmarkCount / pageSize);

  // ページネーションボタンクリック時の処理
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    router.push("?" + params.toString());
  };

  // ページ数が多い場合は表示させるページネーションボタンを限定する
  const generatePageNumbers = (currentPage: number, pageCount: number) => {
    const range = [];
    const visibleRange = 2; // 現在のページの前後に表示するページ数

    if (pageCount <= 5) {
      // ページ数が5ページ以下の場合は全て表示
      for (let i = 1; i <= pageCount; i++) range.push(i);
    } else {
      // ページ数が5ページより多い場合は省略
      range.push(1); // 最初のページをrangeに格納

      // 現在のページの前後を表示
      const start = Math.max(currentPage - visibleRange, 2);
      const end = Math.min(currentPage + visibleRange, pageCount - 1);

      if (start > 2) range.push("..."); // 左側に「...」を格納
      for (let i = start; i <= end; i++) range.push(i); // 中間のページ番号を格納
      if (end < pageCount - 1) range.push("..."); // 右側に「...」を格納

      range.push(pageCount); // 最後のページをrangeに格納
    }

    return range;
  };

  const pageNumbers = generatePageNumbers(currentPage, pageCount);

  return (
    <>
      {pageCount > 1 ? (
        <div className="flex justify-center items-center my-4">
          <ol className="flex gap-4 text-xl">
            {pageNumbers.map((page, index) => (
              <li key={index}>
                {typeof page === "number" ? (
                  <button
                    className={`rounded-full w-8 h-8 ${
                      currentPage === page ? "border border-black" : "hover:bg-gray-200 duration-100"
                    }`}
                    onClick={() => changePage(page)}
                    disabled={currentPage === page}
                  >
                    {page}
                  </button>
                ) : (
                  <span className="w-8 text-center">...</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </>
  );
};
export default Pagenation;
