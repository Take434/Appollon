"use server";

import { apiTrackAudioFeatures } from "@/models/apiModels/apiTrackAudioFeatures";
import { getClient } from "@/prismaClient";
import { Audio_Features } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const apiAudioFeaturesResponse = z.object({
  audio_features: z.array(apiTrackAudioFeatures.nullable()),
});

export const getAudioFeaturesForPlaylist = async (playlistId: string) => {
  const prisma = getClient();

  const currentPlaylist = await prisma.playlist.findFirst({
    where: {
      id: playlistId,
    },
    include: {
      tracks: {
        include: {
          audio_features: true,
        },
      },
    },
  });

  if (!currentPlaylist) {
    console.log("playlist not found");
  }

  return currentPlaylist?.tracks.map((track) => track.audio_features);
};

export const getAudioFeaturesForTracks = async (trackIds: string[]) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  let currentTrackCount = 0;

  const trackAudioFeatures: Audio_Features[] = [];

  while (trackIds.length > currentTrackCount) {
    const res = await axios.get<z.infer<typeof apiAudioFeaturesResponse>>(
      "https://api.spotify.com/v1/audio-features",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          ids: trackIds
            .slice(currentTrackCount, currentTrackCount + 100)
            .toString(),
        },
      }
    );

    const parsedData = apiAudioFeaturesResponse.safeParse(res.data);

    if (!parsedData.success) {
      console.log(parsedData.error);
      console.error(parsedData.error.flatten());
      return;
    }

    trackAudioFeatures.push(
      ...(
        parsedData.data.audio_features!.filter(
          (item) => item !== null
        ) as Audio_Features[]
      ).map((item) => {
        return {
          ...item,
          id: "AUDIOFEATURES_" + item.id,
        } as Audio_Features;
      })
    );
    currentTrackCount += 100;
  }

  return trackAudioFeatures;
};
