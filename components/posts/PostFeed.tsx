import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userid?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userid }) => {
  const { data: posts = [] } = usePosts(userid);
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userid={userid} key={post?.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
