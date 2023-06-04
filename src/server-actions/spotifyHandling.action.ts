"use server";

import { getClient } from "../prismaClient";
import crypto from "crypto";

export const RedirectSpotifyAction = async () => {
  const prisma = getClient();
  const validityState = crypto.randomBytes(32).toString("base64");

  await prisma.validStates.create({
    data: {
      state: validityState,
      timeStamp: new Date(),
    },
  });

  const params = new URLSearchParams([
    ["client_id", process.env.SPOTIFY_CLIENT_ID!],
    ["response_type", "code"],
    ["redirect_uri", process.env.SPOTIFY_REDIRECT_URI!],
    ["state", validityState],
    ["scope", process.env.SPOTIFY_SCOPE!],
  ]);

  return "https://accounts.spotify.com/authorize?" + params.toString();
};
