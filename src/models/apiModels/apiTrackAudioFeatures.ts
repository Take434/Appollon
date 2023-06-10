import { z } from "zod";

export const apiTrackAudioFeatures = z.object({
  duration_ms: z.number(),
  instrumentalness: z.number(),
  loudness: z.number(),
  tempo: z.number(),
  danceability: z.number(),
  energy: z.number(),
  valence: z.number(),
}).array();