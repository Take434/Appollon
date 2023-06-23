import { z } from "zod";
import { apiTrack } from "./apiTrack";

export const apiSavedTrack = z.object({
  track: apiTrack
});
