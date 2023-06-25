"use server";

import { apiTrackAudioFeatures } from "@/models/apiModels/apiTrackAudioFeatures";
import { Audio_Features } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const apiAudioFeaturesResponse = z.object({
  audio_features: apiTrackAudioFeatures.array(),
});

export const getAudioFeaturesForPlaylist = async (playlistId: string) => {
  
}

export const getAudioFeaturesForTracks = async (trackIds: String[]) => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  let currentTrackCount = 0;

  const trackAudioFeatures: Audio_Features[] = [];

  while(trackIds.length > currentTrackCount) {

    const res = await axios.get<z.infer<typeof apiAudioFeaturesResponse>>(
      "https://api.spotify.com/v1/audio-features",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          ids: trackIds.slice(currentTrackCount, currentTrackCount + 100).toString(),
        },
      }
    );

    const parsedData = apiAudioFeaturesResponse.safeParse(res.data);

    if (!parsedData.success) {
      console.log(parsedData.error);
      console.error(parsedData.error.flatten());
      return;
    }

    trackAudioFeatures.push(...parsedData.data.audio_features);
    currentTrackCount += 100;

  }

  return trackAudioFeatures;

  
}