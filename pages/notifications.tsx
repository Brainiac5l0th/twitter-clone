import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export { getServerSideProps };
export default Notifications;
