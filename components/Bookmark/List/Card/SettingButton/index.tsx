"use client";

import { useOpenMenu } from "@/context/OpenMenuContext";
import { BsThreeDots } from "react-icons/bs";
import SettingMenu from "./SettingMenu";
import { useState } from "react";
import { createPortal } from "react-dom";
import DeleteModal from "../DeleteModal";

type Props = {
  id: string;
};

const SettingButton = ({ id }: Props) => {
  const { openMenuId, setOpenMenuId } = useOpenMenu();
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const handleMenuToggle = () => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <>
      <button className="px-2 block h-full setting-button" onClick={handleMenuToggle}>
        <BsThreeDots className="text-2xl" />
      </button>
      {openMenuId === id && <SettingMenu id={id} setIsDeleteClick={setIsDeleteClick} />}
      {isDeleteClick &&
        createPortal(<DeleteModal id={id} setIsDeleteClick={setIsDeleteClick} />, document.getElementById(id)!)}
    </>
  );
};
export default SettingButton;
