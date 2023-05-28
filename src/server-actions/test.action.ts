"use server";

import axios from "axios";
import { meResponseSchema } from "@/types/spotifyAuthTypes";
import { cookies } from "next/headers";

export const testingAction = async () => {
  "use server";

  const res = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
    },
  });

  const parsedData = meResponseSchema.safeParse(res.data);

    if (!parsedData.success) {
      console.error(parsedData.error.flatten());
      return;
    }

    return parsedData.data;
};
