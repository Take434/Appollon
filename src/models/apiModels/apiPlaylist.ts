import { z } from "zod";
import { apiUser } from "./apiUser";
import { apiTrack } from "./apiTrack";

export const apiPlaylist = z.object({
  id: z.string(),
  name: z.string(),
  images: z.object({
    url: z.string(),
  }).array(),
  owner: z.object({
    display_name: z.string(),
  }),
  followers: z.array(apiUser),
  tracks: apiTrack.array(),
});
