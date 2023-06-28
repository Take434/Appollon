import { z } from "zod";

export const apiUser = z.object({
  country: z.string().length(2),
  displayName: z.string(),
  email: z.string(),
  id: z.string(),
  images: z.object({
    url: z.string(),
  }),
});
