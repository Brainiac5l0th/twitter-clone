import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(400).json("Invalid request!");
  }
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      //create post based on user
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser?.id,
        },
      });

      if (!post) {
        return res.status(400).json("Could not create post!");
      }

      return res.status(201).json(post);
    }

    if (req.method === "GET") {
      const { userid } = req.query;

      let posts;

      if (userid && typeof userid === "string") {
        // get all posts for the user
        // also user details and comments
        // on desc order(new first)
        posts = await prisma.post.findMany({
          where: { id: userid },
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("There is a server side error!");
  }
}
