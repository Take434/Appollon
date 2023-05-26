import { PrismaClient } from "@prisma/client";
import Axios from "axios";
import { z } from "zod";

const responseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
});

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  const validityState = new URLSearchParams(request.url.split("?")[1]);

  if (
    !(await prisma.validStates.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      where: { state: validityState.get("state")! },
    }))
  ) {
    console.error("Invalid state");
  }

  const res = await Axios.post(
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

  const data = responseSchema.safeParse(res?.data);

  if (!data.success) {
    console.error(data.error.flatten());
    return;
  }

  console.log(data.data);
}
