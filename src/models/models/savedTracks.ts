import { z } from "zod";
import { apiTrack } from "../apiModels/apiTrack";

export const savedTracks = z.array(apiTrack);
