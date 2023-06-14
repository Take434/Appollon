"use server";

import { apiTrackAudioFeatures } from "@/models/apiModels/apiTrackAudioFeatures";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

export const audioFeaturesForTracks = async (trackIds: string[]) => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const trackFeatures: z.infer<typeof apiTrackAudioFeatures> = [];

  for (let i = 0; i < trackIds.length; i += 100) {
    const res = await axios.get<{
      audio_features: z.infer<typeof apiTrackAudioFeatures>;
    }>("https://api.spotify.com/v1/audio-features", {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        ids: trackIds.slice(i, i + 100).toString(),
      },
    });

    trackFeatures.push(...res.data.audio_features);
  }

  const parsedData = apiTrackAudioFeatures.safeParse(trackFeatures);

  if (!parsedData.success) {
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;
};
