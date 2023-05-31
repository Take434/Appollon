import { PrismaClient } from "@prisma/client";
import Axios from "axios";
import { NextResponse } from "next/server";
import { meResponseSchema } from "../../types/spotifyAuthTypes";
import { firstTokenResponseSchema } from "../../types/spotifyAuthTypes";

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  const validityState = new URLSearchParams(request.url.split("?")[1]);
  const dbValidityState = await prisma.validStates.findUnique({
    where: { state: validityState.get("state")! },
  });

  //check if the state provided by spotify is valid
  if (!dbValidityState) {
    console.error("Invalid state");

    prisma.$disconnect();
    return;
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
      ["code", validityState.get("code")!],
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

    prisma.$disconnect();
    return;
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

    prisma.$disconnect();
    return;
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
        pfpLink: meData.data.images[0].url,
        token: Buffer.from(tokenData.data.access_token, "utf-8"),
        refreshToken: Buffer.from(tokenData.data.refresh_token, "utf-8"),
        isAdmin: false,
      },
    });
  } else {
    //if the user is already in the database, update the token
    await prisma.user.update({
      where: { id: meData.data.id },
      data: {
        token: Buffer.from(tokenData.data.access_token, "utf-8"),
        refreshToken: Buffer.from(tokenData.data.refresh_token, "utf-8"),
      },
    });
  }

  const answ = NextResponse.redirect(`http:localhost:3000/welcome`);
  answ.cookies.set("token", tokenData.data.access_token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  prisma.$disconnect();
  return answ;
}
