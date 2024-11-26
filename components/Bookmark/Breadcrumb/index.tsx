import { getBreadcrumbPath } from "@/utils/common/breadcrumbs";
import { BreadcrumbType } from "@/types/breadcrumbType";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  id: string;
};

const Breadcrumb = async ({ id }: Props) => {
  const breadcrumb: BreadcrumbType = await getBreadcrumbPath(id);
  const breadcrumbKeys: (keyof BreadcrumbType)[] = ["grandParentFolderName", "parentFolderName", "currentFolder"];

  return (
    <div className="mb-2 py-4 flex justify-start items-center gap-2 overflow-x-auto">
      <p className="text-xs px-2 py-1 rounded-md bg-gray-500 text-white flex justify-center items-center shrink-0">
        表示中のフォルダ
      </p>
      <ol className="flex shrink-0">
        {breadcrumbKeys
          .filter((key) => breadcrumb[key]?.name)
          .map((key, index, array) => (
            <li key={key} className="flex justify-center items-center">
              <a
                href={breadcrumb[key]?.id ? breadcrumb[key]?.id : ""}
                className={`underline hover:no-underline ${index === array.length - 1 && "no-underline pointer-events-none"}`}
              >
                {breadcrumb[key]?.name}
              </a>
              {index < array.length - 1 && <IoIosArrowForward className="mx-2" />}
            </li>
          ))}
      </ol>
    </div>
  );
};
export default Breadcrumb;
