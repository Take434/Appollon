"use server";

import { savedTracks } from "@/models/models/savedTracks";
import { Playlist } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const apiSimplePlaylist = z.object({
  id: z.string(),
  title: z.string(),
  images: z.object({
    url: z.string(),
  }),
  owner: z.object({
    display_name: z.string(),
  }),
  tracks: z.object({
    total: z.number(),
  }),
});

const apiPlaylist = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  items: z.array(apiSimplePlaylist),
});

export const getPlaylistsForUser = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiCall = await axios.get<z.infer<typeof apiPlaylist>>(
    "https://api.spotify.com/v1/me/playlists",
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

  const playlistsArray: Playlist[] = [];

  const totalPlaylistCount = apiCall.data.total;
  let currentPlaylistCount = 0;

  while (totalPlaylistCount > currentPlaylistCount) {
    const currentTrackLimit =
      totalPlaylistCount - currentPlaylistCount > 50
        ? 50
        : totalPlaylistCount - currentPlaylistCount;

    const res = await axios.get<z.infer<typeof apiPlaylist>>(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          market: "GE",
          limit: currentTrackLimit,
          offset: currentPlaylistCount,
        },
      }
    );

    playlistsArray.push(...res.data.items.map(pA => {
      const playlist: Playlist = {
        coverLink: pA.images ,

      }
      return playlist;
    }));
    currentPlaylistCount += currentTrackLimit;
  }

  const parsedData = savedTracks.safeParse(playlistsArray);

  if (!parsedData.success) {
    console.log(parsedData.error);
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;
};
