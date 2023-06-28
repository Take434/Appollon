import { z } from "zod";
import { apiArtist } from "./apiArtist";

export const apiTrack = z.object({
  id: z.string(),
  artists: apiArtist.array(),
  duration_ms: z.number(),
  name: z.string(),
});
