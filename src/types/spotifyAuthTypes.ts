import { z } from "zod";

/**
 * The schema for the response from the Spotify API when requesting the user's data
 */
export const meResponseSchema = z.object({
  country: z.string(),
  display_name: z.string(),
  email: z.string(),
  explicit_content: z.object({
    filter_enabled: z.boolean(),
    filter_locked: z.boolean(),
  }),
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number(),
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number().nullable(),
      url: z.string(),
      width: z.number().nullable(),
    })
  ),
  product: z.string(),
  type: z.string(),
  uri: z.string(),
});

/**
 * The schema for the response from the Spotify API when requesting a token for the first time
 */
export const firstTokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
});
