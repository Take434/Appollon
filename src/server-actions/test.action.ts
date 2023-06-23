"use server";

import { cookies } from "next/headers";
import { refreshSpotifyToken } from "@/server-actions/spotifyHandling.action";

export const testingAction = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const res = await refreshSpotifyToken(token);

  console.log(res);

  // const res = await axios.get("https://api.spotify.com/v1/me", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // });

  // const parsedData = meResponseSchema.safeParse(res.data);

  // if (!parsedData.success) {
  //   console.error(parsedData.error.flatten());
  //   return;
  // }

  // return parsedData.data;
};
