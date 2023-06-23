"use server";

import { savedTracks } from "@/models/models/savedTracks";
import { Playlist, Track } from "@prisma/client";
import { getClient } from "../../prismaClient";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";
import { PlaylistWithTracks } from "@/models/dbModels/dbModels";

const apiSimplifiedPlaylistObject = z.object({
  id: z.string(),
  name: z.string(),
  images: z.object({
    url: z.string(),
  }).array(),
  owner: z.object({
    display_name: z.string(),
  }),
  tracks: z.object({
    total: z.number(),
  }),
});

const apiPlaylistResponse = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  items: z.array(apiSimplifiedPlaylistObject),
});

export const getPlaylistsForUser = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiCall = await axios.get<z.infer<typeof apiPlaylistResponse>>(
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

    const res = await axios.get<z.infer<typeof apiPlaylistResponse>>(
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
        coverLink: pA.images[0].url,
        creatorName: pA.owner.display_name,
        id: pA.id,
        title: pA.name,
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
