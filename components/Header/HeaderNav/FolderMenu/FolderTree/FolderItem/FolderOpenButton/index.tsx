import { IoIosArrowDown } from "react-icons/io";

type Props = {
  isSubFolderVisible: boolean;
  toggleFolder: () => void;
};

const FolderOpenButton = ({ isSubFolderVisible, toggleFolder }: Props) => {
  return (
    <button onClick={toggleFolder} className="px-2">
      <IoIosArrowDown className={`${isSubFolderVisible ? "rotate-180" : ""}`} />
    </button>
  );
};
export default FolderOpenButton;
