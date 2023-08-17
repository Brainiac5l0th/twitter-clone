// dependencies
import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    // get current user
    const { currentUser } = await serverAuth(req);
    //destructure
    const { id, name, username, bio, coverImage, profileImage } = currentUser;

    if (!name || !username) {
      throw new Error("Missing fields!");
    }

    // update the user information
    const updatedUser = await prisma?.user.update({
      where: { id: id },
      data: {
        username,
        name,
        bio,
        profileImage,
        coverImage,
      },
    });

    // return response
    return res.status(200).json("Updated Successfully!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("There is a server side error!");
  }
}
