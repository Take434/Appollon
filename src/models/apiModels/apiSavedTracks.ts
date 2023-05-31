import { z } from "zod";
import { apiTrack } from "./apiTrack";

export const apiSavedTracks = z.object({
    items: z.array(
        z.object({
            track: apiTrack,
        })
    ),
});