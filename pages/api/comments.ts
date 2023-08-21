import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

prisma;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    // destructure body from request
    const { body } = req.body;
    // get postId from request
    const { postId } = req.query;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("invalid request!");
    }

    const comment = await prisma.comment.create({
      data: { body, userId: currentUser?.id, postId },
    });

    // return post
    return res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export default handler;
