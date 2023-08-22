import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BsDot } from "react-icons/bs";
import { IconType } from "react-icons/lib/esm/iconBase";
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onclick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onclick,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  //handler
  const handleClick = useCallback(() => {
    if (onclick) return onclick();
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) router.push(href);
  }, [href, router, onclick, auth, currentUser, loginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* mobile screen  */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-200 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>

      {/* desktop screen */}
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opactiy-10 cursor-pointer">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
