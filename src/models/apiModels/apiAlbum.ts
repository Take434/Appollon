import { z } from "zod";
import { apiArtist } from "./apiArtist";
import { apiTrack } from "./apiTrack";

export const apiAlbum = z.object({
  id: z.string(),
  name: z.string(),
  album_type: z.string(),
  total_tracks: z.number(),
  release_date: z.string(),
  images: z.object({
    url: z.string(),
  }),
  genres: z.string().array(),
  artists: apiArtist.array(),
  tracks: apiTrack,
});
