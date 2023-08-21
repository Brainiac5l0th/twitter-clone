import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { postid } = req.query;

    if (!postid || typeof postid !== "string") {
      throw new Error("Invalid id!");
    }

    const post = await prisma?.post.findUnique({
      where: { id: postid },
      include: {
        user: true,
        comments: {
          include: { user: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json("There is a server side error!");
  }
};

export default handler;
