import { getClient } from "../../prismaClient";
import Axios from "axios";
import { NextResponse } from "next/server";
import { meResponseSchema } from "../../types/spotifyAuthTypes";
import { firstTokenResponseSchema } from "../../types/spotifyAuthTypes";

export async function GET(request: Request) {
  const prisma = getClient();
  const urlParams = new URL(request.url).searchParams;

  if (!urlParams.get("state")) {
    console.error("No state provided");
    return new Response("No state provided", { status: 400 });
  }

  const dbValidityState = await prisma.validStates.findUnique({
    where: { state: urlParams.get("state")! },
  });

  //check if the state provided by spotify is valid
  if (!dbValidityState) {
    console.error("Invalid state");
    return new Response("Invalid state", { status: 400 });
  }

  await prisma.validStates.delete({
    where: { state: dbValidityState.state },
  });

  //get the token from spotify
  const tokenRes = await Axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams([
      ["client_id", process.env.SPOTIFY_CLIENT_ID!],
      ["grant_type", "authorization_code"],
      ["code", urlParams.get("code")!],
      ["redirect_uri", process.env.SPOTIFY_REDIRECT_URI!],
    ]).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
    }
  ).catch((err) => {
    console.error(err);
  });

  const tokenData = firstTokenResponseSchema.safeParse(tokenRes?.data);

  //check if the token-response is valid
  if (!tokenData.success) {
    console.error(tokenData.error.flatten());
    return new Response("Spotify request to get tokens failed", {
      status: 500,
    });
  }

  const meRes = await Axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + tokenData.data.access_token,
    },
  }).catch((err) => {
    console.error(err);
  });

  const meData = meResponseSchema.safeParse(meRes?.data);

  //check if the me-response is valid
  if (!meData.success) {
    console.error(meData.error.flatten());
    return new Response("Spotify request to get user data failed", {
      status: 500,
    });
  }

  //check if the user is already in the database
  const userInDB = await prisma.user.findUnique({
    where: { id: meData.data.id },
  });

  //if not, create a new user
  if (!userInDB) {
    await prisma.user.create({
      data: {
        id: meData.data.id,
        name: meData.data.display_name,
        email: meData.data.email,
        pfpLink: meData.data.images[0]?.url ?? "ALL CAP NO PICTURE",
        token: tokenData.data.access_token,
        refreshToken: tokenData.data.refresh_token,
        isAdmin: false,
      },
    });
  } else {
    //if the user is already in the database, update the token
    await prisma.user.update({
      where: { id: meData.data.id },
      data: {
        token: tokenData.data.access_token,
        refreshToken: tokenData.data.refresh_token,
      },
    });
  }

  const answ = NextResponse.redirect(`https://${ process.env.VERCEL_URL }/home`);

  const cookie = answ.cookies.get("token");

  if (cookie) {
    answ.cookies.delete("token");
  }

  answ.cookies.set("token", tokenData.data.access_token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return answ;
}
