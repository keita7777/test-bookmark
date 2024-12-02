import { logout } from "@/utils/auth/authFunctions";
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col px-4 py-6 md:p-0">
      <button
        onClick={async () => {
          await logout();
          router.push("/signin");
          router.refresh();
        }}
        className="flex justify-center items-center gap-4 rounded-md text-white bg-red-600 p-2 hover:bg-red-500 duration-100"
      >
        ログアウト
      </button>
    </div>
  );
};
export default ProfileMenu;
