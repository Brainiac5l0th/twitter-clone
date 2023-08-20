import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  // handler to check if the user is following or not
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list?.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [
    toast,
    isFollowing,
    currentUser,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
