import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>;
  userid?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userid }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/user/${data.user?.id}`);
    },
    [router, data.user?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  // like handler
  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModal.onOpen();
    },
    [loginModal]
  );

  // formating post data date
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 rounded-md cursor-pointer p-5 hover:bg-neutral-900 transition"
    >
      <div className="flex items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div className="">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {data?.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white text-xl mt-1">{data.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div className="flex items-center text-neutral-500 gap-2 cursor-pointer hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>

            <div
              onClick={onLike}
              className="flex items-center text-neutral-500 gap-2 cursor-pointer hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p>{data.likes?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
