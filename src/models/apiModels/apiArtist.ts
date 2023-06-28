import { z } from "zod";

export const apiArtist = z.object({
  followers: z
    .object({
      total: z.number(),
    })
    .nullish(),
  genres: z.string().array().nullish(),
  id: z.string(),
  name: z.string(),
});
