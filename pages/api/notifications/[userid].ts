import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userid } = req.query;

    if (!userid || typeof userid !== "string") {
      throw new Error("Invalid ID!");
    }

    // get notifications from database for a user
    const notifications = await prisma?.notification?.findMany({
      where: { userId: userid },
      orderBy: { createdAt: "desc" },
    });

    // once notifications are passed, remove notifications from the user information
    await prisma.user.update({
      where: { id: userid },
      data: { hasNotification: false },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export default handler;
