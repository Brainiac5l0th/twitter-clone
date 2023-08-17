// dependencies
import Image from "next/image";

import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

// props type
interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  // get user info from DB using userId
  const { data: user } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={user?.coverImage}
            alt={`${user.username}'s cover`}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
