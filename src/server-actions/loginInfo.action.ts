"use server";

import { cookies } from "next/headers";

export const logoutUser = () => {
  cookies().delete("token");
  return true;
};

export const isUserLoggedIn = () => {
  return cookies().get("token") ? true : false;
};
