import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications?.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col ">
      {fetchedNotifications?.map((notification: Record<string, any>) => (
        <div className="flex items-center gap-4 p-6 border-b-[1px] border-neutral-800 hover:bg-neutral-500">
          <BsTwitter size={32} color={"white"} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
