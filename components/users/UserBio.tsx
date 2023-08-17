//dependencies
import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  //hooks
  const editModal = useEditModal();

  // fetching current user information
  const { data: currentUser } = useCurrentUser();

  // fetching user information passed through query
  const { data: user } = useUser(userId);

  // date formatting
  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }
    return format(new Date(user?.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p2 mt-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button secondary label="Follow" onClick={() => {}} />
        )}
      </div>

      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{user?.name}</p>
          <p className="text-md text-neutral-500">@{user?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{user?.bio}</p>
          <div className="flex items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p className="">Joined {createdAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          {/*  following */}
          <div className="flex flex-row justify-start items-center gap-1">
            <p className="text-white">{user?.followingIds?.length}</p>
            <p className="text-neutral-500">following</p>
          </div>
          {/*  followers */}
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followers}</p>
            <p className="text-neutral-500">followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
