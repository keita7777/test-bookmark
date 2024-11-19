"use client";

import { useOpenMenu } from "@/context/OpenMenuContext";
import { BsThreeDots } from "react-icons/bs";
import SettingMenu from "./SettingMenu";

type Props = {
  id: string;
};

const SettingButton = ({ id }: Props) => {
  const { openMenuId, setOpenMenuId } = useOpenMenu();
  const handleMenuToggle = () => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <>
      <button className="px-2 block h-full setting-button" onClick={handleMenuToggle}>
        <BsThreeDots className="text-2xl" />
      </button>
      {openMenuId === id && <SettingMenu id={id} />}
    </>
  );
};
export default SettingButton;
