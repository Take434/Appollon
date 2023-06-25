"use server";

import { apiTrack } from "@/models/apiModels/apiTrack";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const apiTracksForPlaylistResponse = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  items: z.array(z.object({
    track: apiTrack,
  })),
})

export const getTracksForPlaylist = async (playlistId: string) => {
  
  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiCall = await axios.get<z.infer<typeof apiTracksForPlaylistResponse>>(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        market: "GE",
        limit: 1,
        offset: 0,
      },
    }
  );

  const parsedData = apiTracksForPlaylistResponse.safeParse(apiCall.data);

    if (!parsedData.success) {
      console.log(parsedData.error);
      console.error(parsedData.error.flatten());
      return;
    }

  const currentTrackCount = 0;
  const totalTrackCount = parsedData.data.total;

  while(totalTrackCount > currentTrackCount) {

    const res = await axios.get<z.infer<typeof apiTracksForPlaylistResponse>>(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          market: "GE",
          limit: currentTrackCount + 50,
          offset: 50,
        },
      }
    );

    const parsedData = apiTracksForPlaylistResponse.safeParse(res.data);

    if (!parsedData.success) {
      console.log(parsedData.error);
      console.error(parsedData.error.flatten());
      return;
    }

    

  }
}