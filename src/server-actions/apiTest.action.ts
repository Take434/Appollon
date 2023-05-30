"use server";

import { apiArtist } from "@/models/apiModels/apiArtist";
import { apiArtistsObject } from "@/models/apiModels/apiArtistsObject";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

export const apiTestingAction = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const res = await axios.get("https://api.spotify.com/v1/artists/6fOMl44jA4Sp5b9PpYCkzz", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const parsedData = apiArtist.safeParse(res.data);

  if (!parsedData.success) {
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;
}

export const apiUserArtistsAction = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const res = await axios.get("https://api.spotify.com/v1/me/following?type=artist", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const parsedData = apiArtistsObject.safeParse(res.data);

  console.log(parsedData.success ? parsedData.data : "");

  if (!parsedData.success) {
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;

}