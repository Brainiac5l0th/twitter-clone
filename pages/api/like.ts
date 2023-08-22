import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    // get post id from the request body
    const { postId } = req.body;

    // server auth hold the current user's information
    const { currentUser } = await serverAuth(req, res);

    // if postid is not valid, return with error
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid request!");
    }

    // check for post in the database
    const post = await prisma?.post.findUnique({ where: { id: postId } });

    // if there is no data, return an error
    if (!post) {
      throw new Error("Invalid id!");
    }

    // get all like user's ids from the post data, thus we can mutate it and update the latest information
    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      // if the method is post, that means user liking the post, thus we will add the current user's id to the liked ids
      updatedLikedIds.push(currentUser?.id);

      // send notification to the user author
      try {
        // fetch current post
        const post = await prisma.post.findUnique({ where: { id: postId } });

        if (post?.userId) {
          // set the notification
          await prisma.notification.create({
            data: {
              body: `@${currentUser?.username} liked your post.`,
              link: `/posts/${post?.id}`,
              userId: post?.userId,
            },
          });

          // set notification to true for the author
          await prisma.user.update({
            where: { id: post?.userId },
            data: { hasNotification: true },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (req.method === "DELETE") {
      // delete method means that user is removing like
      // so we will filter out user's id from the liked ids
      updatedLikedIds = updatedLikedIds.filter(
        (like) => like !== currentUser?.id
      );
    }

    // update the post information
    const updatedPost = await prisma?.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    // success message
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export default handler;
