"use server";

import { getClient } from "@/prismaClient";
import { cookies } from "next/headers";

export const getBasicUserData = async () => {

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const prisma = getClient();

  const currentUser = await prisma.user.findFirst({
    where: {
      token: token,
    },
  });

  return currentUser;
}