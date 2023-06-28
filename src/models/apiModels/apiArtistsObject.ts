import { z } from "zod";
import { apiArtist } from "./apiArtist";

export const apiArtistsObject = z.object({
  artists: z.object({
    items: apiArtist.array(),
    total: z.number(),
  }),
});
