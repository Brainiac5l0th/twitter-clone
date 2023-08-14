import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <div className="mt-6 lg:hidden rounded-full h-14 p-4 w-14 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
        <FaFeather size={28} color={"white"} />
      </div>
      <div className="mt-6 hidden  lg:block rounded-full px-4 py-2  bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
