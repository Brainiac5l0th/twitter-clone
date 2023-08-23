import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const gotoUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/user/${data.user?.id}`);
    },
    [data.user?.id, router]
  );

  // formatting the date
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral900 transition">
      <div className="flex items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div>
          <div className="flex items-center gap-2">
            <p
              onClick={gotoUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data?.user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hidden md:block text-sm">
              @{data?.user?.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data?.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
