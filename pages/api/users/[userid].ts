//dependencies
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Invalid Request!" });
  }
  try {
    //user id validity
    const userId =
      req.query?.userId &&
      typeof req.query.userId === "string" &&
      req.query.userId.trim().length > 0
        ? req.query.userId
        : false;

    if (!userId) {
      return res.status(400).json({ message: "Invalid id!" });
    }

    //lookup for the user in the database
    const user = await prisma?.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const followersCount =
      (await prisma.user.count({
        where: {
          followingIds: {
            has: userId,
          },
        },
      })) || 0;

    //return the user object along with followers count
    return res.status(200).json({ ...user, followers: followersCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "there is a server side error!" });
  }
}
