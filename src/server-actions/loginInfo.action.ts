"use server";

import { cookies } from "next/headers";
import { getClient } from "../prismaClient";

export const logoutUser = () => {
  cookies().delete("token");
  return true;
};

export const isUserLoggedIn = async () => {
  const prisma = getClient();
  const token = cookies().get("token")?.value;

  if (!token) {
    return false;
  }

  const user = await prisma.user.findFirst({
    where: {
      token: cookies().get("token")?.value,
    },
  });

  return user ? true : false;
};
