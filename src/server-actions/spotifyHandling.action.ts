"use server";

import axios from "axios";
import { getClient } from "../prismaClient";
import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Returns the url to the spotify login page with the correct parameters
 */
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

/**
 * Gets a new access token from spotify and saves it to the database
 */
export const refreshSpotifyToken = async (token: string) => {
  const prisma = getClient();

  if (!token) {
    console.error("No token found");
    return;
  }

  console.log(token);

  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
  });

  console.log(user);

  if (!user?.refreshToken) {
    return "No refresh token found";
  }

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const accessToken = res.data.access_token;

  if (!accessToken) {
    throw new Error("could not get a new access token");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: accessToken,
    },
  });

  cookies().set("token", accessToken, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return accessToken;
};
