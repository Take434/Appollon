import { z } from "zod";

export const apiSimplifiedPlaylistObject = z.object({
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