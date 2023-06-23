"use server";

import { apiSavedTrack } from "@/models/apiModels/apiSavedTrack";
import { apiTrack } from "@/models/apiModels/apiTrack";
import { savedTracks } from "@/models/models/savedTracks";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const apiSavedTracksResponse = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  items: z.array(
    z.object({
      track: apiTrack
    })
  )
});

export const getSavedTracks = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiCall = await axios.get<z.infer<typeof apiSavedTracksResponse>>("https://api.spotify.com/v1/me/tracks", {
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

    const res = await axios.get<z.infer<typeof apiSavedTracksResponse>>(
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
