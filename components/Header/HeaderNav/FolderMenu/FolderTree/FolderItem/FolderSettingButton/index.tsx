import { BsThreeDots } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string | null;
  openMenuId: string | null;
  setOpenMenuId: Dispatch<SetStateAction<string | null>>;
};

const FolderSettingButton = ({ id, openMenuId, setOpenMenuId }: Props) => {
  const handleMenuToggle = () => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <>
      <button className="px-2 folder-setting-button" onClick={handleMenuToggle}>
        <BsThreeDots />
      </button>
    </>
  );
};
export default FolderSettingButton;
