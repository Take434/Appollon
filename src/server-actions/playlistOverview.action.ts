"use server";

import { getClient } from "@/prismaClient";
import { cookies } from "next/headers";

export const getUsersPalylistFromDB = async () => {
  const prisma = getClient();

  const token = cookies().get("token")?.value;

  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
    include: {
      playlists: {
        include: {
          tracks: true,
        },
      },
    },
  });

  if (!user) {
    return "No user found";
  }

  return user.playlists;
};
