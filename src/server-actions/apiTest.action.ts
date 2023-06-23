"use server";

import { apiArtist } from "@/models/apiModels/apiArtist";
import { apiArtistsObject } from "@/models/apiModels/apiArtistsObject";
import { apiSavedTracks } from "@/models/apiModels/apiSavedTrack";
import { apiTrackAudioFeatures } from "@/models/apiModels/apiTrackAudioFeatures";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

export const apiTestingAction = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const res = await axios.get(
    "https://api.spotify.com/v1/artists/6fOMl44jA4Sp5b9PpYCkzz",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const parsedData = apiArtist.safeParse(res.data);

  if (!parsedData.success) {
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;
};

export const apiUserArtistsAction = async () => {
  "use server";

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const res = await axios.get(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const parsedData = apiArtistsObject.safeParse(res.data);

  console.log(parsedData.success ? parsedData.data : "");

  if (!parsedData.success) {
    console.error(parsedData.error.flatten());
    return;
  }

  return parsedData.data;
};

export const apiTrackAudioFeaturesForPlaylist = async (playlistId: string) => {
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

// export const getSavedTracks = async () => {
//   "use server";

//   const token = cookies().get("token")?.value;

//   if (!token) {
//     return "No token found";
//   }

//   const res = await axios.get<z.infer<typeof apiSavedTracks>>("https://api.spotify.com/v1/me/tracks", {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//     params: {
//       market: "GE",
//       limit: 1,
//       offset: 0,
//     },
//   });

//   const parsedTracks: z.infer<typeof apiSavedTracks>["items"] = [];

//   const totalTrackCount = res.data.total;
//   let currentTrackCount = 0;

//   while (totalTrackCount > currentTrackCount) {
//     const currentTrackLimit =
//       totalTrackCount - currentTrackCount > 50
//         ? 50
//         : totalTrackCount - currentTrackCount;

//     const apiRes = await axios.get<z.infer<typeof apiSavedTracks>>("https://api.spotify.com/v1/me/tracks", {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       params: {
//         market: "GE",
//         limit: currentTrackLimit,
//         offset: currentTrackCount,
//       },
//     });

//   const parsedData = apiSavedTracks.safeParse(apiRes.data);
//     res.data.items = res.data.items.concat(apiRes.data.items);
//     currentTrackCount += currentTrackLimit;
  

//   console.log(JSON.stringify(res.data.total));

//   if (!parsedData.success) {
//     console.log(parsedData.error);
//     console.error(parsedData.error.flatten());
//     return;
//   }

//   parsedTracks.items.push(...parsedData.data.items);
//   currentTrackCount += currentTrackLimit;

//   }

//   return parsedTracks;
// }

// export const apiTrackAudioFeaturesForSavedTracks = async () => {
//   "use server";

//   let trackIds: string[] = [];

//   await getSavedTracks().then((data) => {
//     if (data === "No token found") {
//       return;
//     } else {
//       trackIds = data!.items.map((item) => item.track.id);
//     }
//   });

//   const token = cookies().get("token")?.value;

//   if (!token) {
//     return "No token found";
//   }

//   let currentTrackCount = 0;
//   const parsedTracks: z.infer<typeof apiTrackAudioFeatures> = [];
//   const totalTrackCount = trackIds.length;

//   while (totalTrackCount > currentTrackCount) {
//     const currentTrackLimit =
//       totalTrackCount - currentTrackCount > 100
//         ? 100
//         : totalTrackCount - currentTrackCount;
//     const currentIds = trackIds.slice(
//       currentTrackCount,
//       currentTrackLimit + currentTrackCount
//     );
//     console.log(currentIds.toString());

//     const apiRes = await axios.get<{audio_features: z.infer<typeof apiTrackAudioFeatures>}>("https://api.spotify.com/v1/audio-features", {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       params: {
//         ids: currentIds.toString(),
//       }
//     );

//     const parsedData = apiTrackAudioFeatures.safeParse(apiRes.data.audio_features);

//   if (!parsedData.success) {
//     console.error(parsedData.error.flatten());
//     return;
//   }

//     parsedTracks.push(...parsedData.data);

//     currentTrackCount += 100;
//   }

//   return parsedTracks;
// }