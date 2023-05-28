import { z } from "zod";

export const apiArtist = z.object({
  followers: z.object({
    total: z.number(),
  }),
  genres: z.string().array().nullable(),
  id: z.string(),
  name: z.string(),
});
