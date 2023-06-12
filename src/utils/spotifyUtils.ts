import axios from "axios";
import { getClient } from "../prismaClient";
import { cookies } from "next/headers";

/**
 * Gets a new access token from spotify and saves it to the database
 */
export const refreshSpotifyToken = async (token: string) => {
  console.log("refreshing token");

  const prisma = getClient();

  if (!token) {
    console.error("No token found");
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
  });

  if (!user?.refreshToken) {
    throw "No refresh token found";
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

export const spotifyRequestWrapper = async <T>(
  requestToSpotify: () => Promise<T>
): Promise<T> => {
  try {
    return await requestToSpotify();
  } catch (e) {
    console.log("caught an error");

    if (!axios.isAxiosError(e)) {
      throw e;
    }

    console.log("is an axios error");

    if (e.response?.status === 401) {
      console.log("token expired");

      const currToken = cookies().get("token")?.value;

      if (!currToken) {
        throw new Error("No token found");
      }

      await refreshSpotifyToken(currToken);

      return await requestToSpotify();
    }

    if (e.response?.status === 429) {
      console.log("Rate limit exceeded");
    }

    throw e;
  }
};
