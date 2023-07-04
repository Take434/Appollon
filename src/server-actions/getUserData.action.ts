"use server";

import { getClient } from "../prismaClient";
import { cookies } from "next/headers";

export const getUserData = async () => {
  const token = cookies().get("token")?.value;

  if (!token) {
    console.log("No token found");
    return;
  }

  const prisma = getClient();

  const currentUser = await prisma.user.findFirst({
    where: {
      token: token,
    },
    include: {
      playlists: true,
    },
  });

  if (!currentUser) {
    console.log("No user found");
    return;
  }

  return currentUser;
};
