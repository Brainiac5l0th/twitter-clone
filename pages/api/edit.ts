// dependencies
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @TODO:---------GETTING SERVER AUTH ERROR-----------!!
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    // get current user
    const { currentUser } = await serverAuth(req, res);

    //destructure
    const { name, username, bio, coverImage, profileImage } = req.body;

    if (!name || !username) {
      throw new Error("Missing fields!");
    }

    // update the user information
    const updatedUser = await prisma?.user.update({
      where: { id: currentUser?.id },
      data: {
        username,
        name,
        bio,
        profileImage,
        coverImage,
      },
    });

    // return response
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("There is a server side error");
  }
}
