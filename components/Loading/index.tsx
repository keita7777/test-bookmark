"use client";

import PuffLoader from "react-spinners/PuffLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <PuffLoader size={150} />
    </div>
  );
};
export default Loading;
