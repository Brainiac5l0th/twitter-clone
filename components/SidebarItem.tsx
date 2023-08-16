import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onclick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onclick,
}) => {
  const router = useRouter();

  //handler
  const handleClick = useCallback(() => {
    if (onclick) return onclick();

    if (href) router.push(href);
  }, [href, router, onclick]);
  
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-200 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opactiy-10 cursor-pointer">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
