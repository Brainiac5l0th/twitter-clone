import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";

const userView = () => {
  const router = useRouter();

  // get user id from query
  const { userId } = router.query as { userId: string };

  // get user information from database
  const { data: user, isLoading } = useUser(userId);

  //decide what to render
  let content;
  if (isLoading || !user) {
    content = (
      <div className="flex h-full justify-center items-center">
        <ClipLoader size={80} color="lightblue" />
      </div>
    );
  }

  // render user information after getting
  if (!isLoading && user?.username) {
    content = (
      <>
        <Header showBackArrow label={user?.name} />
        <UserHero userId={userId} />

        <UserBio userId={userId} />
      </>
    );
  }

  return content;
};

export default userView;
