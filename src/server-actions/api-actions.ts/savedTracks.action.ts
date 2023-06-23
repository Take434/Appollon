"use server";

import { apiSavedTracks } from "@/models/apiModels/apiSavedTracks";
import { savedTracks } from "@/models/models/savedTracks";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

export const getSavedTracks = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiCall = await axios.get("https://api.spotify.com/v1/me/tracks", {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      market: "GE",
      limit: 1,
      offset: 0,
    },
  });

  const savedTracksArray: z.infer<typeof savedTracks> = [];

  const totalTrackCount = apiCall.data.total;
  let currentTrackCount = 0;

  while (totalTrackCount > currentTrackCount) {
    const currentTrackLimit =
      totalTrackCount - currentTrackCount > 50
        ? 50
        : totalTrackCount - currentTrackCount;

    const res = await axios.get<z.infer<typeof apiSavedTracks>>(
      "https://api.spotify.com/v1/me/tracks",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          market: "GE",
          limit: currentTrackLimit,
          offset: currentTrackCount,
        },
      }
    );

    savedTracksArray.push(...res.data.items.map((items) => items.track));
    currentTrackCount += currentTrackLimit;
  }

  const parsedData = savedTracks.safeParse(savedTracksArray);

  if (!parsedData.success) {
    console.log(parsedData.error);
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;
};
