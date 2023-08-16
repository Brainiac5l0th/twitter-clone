//dependencies
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ hasBorder, userId, isLarge }) => {
  const router = useRouter();
  const { data: user } = useUser(userId);

  // handler
  const handleClick = useCallback(
    (event: any) => {
      // image is clickable
      // when clicked to override parent elemnt onClick
      event.stopPropagation();

      // make url for each avatar
      const url = `/user/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full
        hover:opacity-90
        cursor-pointer
        relative
        `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt={user?.username || "Avatar"}
        onClick={handleClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
