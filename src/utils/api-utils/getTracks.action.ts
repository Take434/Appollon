"use server";

import { apiTrack } from "@/models/apiModels/apiTrack";
import { Artist, Audio_Features, Prisma, Track } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";
import { getAudioFeaturesForTracks } from "./getAudioFeaturesForPlaylists.action";
import { getClient } from "@/prismaClient";
import { getSavedTracks } from "./getSavedTracks.action";

const apiTracksForPlaylistResponse = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  items: z.array(
    z.object({
      track: apiTrack,
    })
  ),
});

export const getTracksForPlaylist = async (playlistId: string) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiTracks: z.infer<typeof apiTrack>[] = [];

  if (playlistId.includes("SAVEDTRACKS")) {
    const savedTracks = await getSavedTracks();

    if (savedTracks === "No token found" || !savedTracks) {
      return;
    }

    apiTracks.push(...savedTracks);
  } else {
    const apiCall = await axios.get<
      z.infer<typeof apiTracksForPlaylistResponse>
    >(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        market: "GE",
        limit: 1,
        offset: 0,
      },
    });

    const parsedData = apiTracksForPlaylistResponse.safeParse(apiCall.data);

    if (!parsedData.success) {
      console.log(parsedData.error);
      console.error(parsedData.error.flatten());
      return;
    }

    let currentTrackCount = 0;
    const totalTrackCount = parsedData.data.total;

    while (totalTrackCount > currentTrackCount) {
      const res = await axios.get<z.infer<typeof apiTracksForPlaylistResponse>>(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            market: "GE",
            limit: 50,
            offset: currentTrackCount,
          },
        }
      );

      const parsedData = apiTracksForPlaylistResponse.safeParse(res.data);

      if (!parsedData.success) {
        console.log(parsedData.error);
        console.error(parsedData.error.flatten());
        return;
      }

      apiTracks.push(...parsedData.data.items.map((item) => item.track));

      currentTrackCount += 50;
    }
  }

  const tracksAudioFeatures = await getAudioFeaturesForTracks(
    apiTracks.map((item) => item.id)
  );

  if (tracksAudioFeatures === "No token found" || !tracksAudioFeatures) {
    return;
  }

  const prisma = getClient();

  let afInDb = await prisma.audio_Features.findMany({
    select: {
      id: true,
    },
  });

  const audioFeaturesToCreate = tracksAudioFeatures.filter((item) => {
    return !afInDb.map((af) => af.id).includes("AUDIOFEATURES_" + item.id);
  });

  await prisma.audio_Features.createMany({
    data: audioFeaturesToCreate.map((item) => {
      return {
        ...item,
        id: "AUDIOFEATURES_" + item.id,
      } satisfies Audio_Features;
    }),
    skipDuplicates: true,
  });

  const tracks = apiTracks.map((item) => {
    return {
      id: item.id,
      title: item.name,
      audio_FeaturesId: item.id,
    } as Track;
  });

  const artistsToCreate: Artist[] = [];
  const allArtistsInDb = await prisma.artist.findMany();
  const dbTracks: Prisma.TrackCreateInput[] = [];

  afInDb = await prisma.audio_Features.findMany({
    select: {
      id: true,
    },
  });

  let coolStuffToCreate: { track: string; artist: string }[] = [];

  apiTracks.forEach((track) => {
    const artistsToConnect: Artist[] = [];

    track.artists.forEach((artist) => {
      artistsToConnect.push(artist);

      coolStuffToCreate.push({
        track: track.id,
        artist: artist.id,
      });

      if (!allArtistsInDb.includes(artist)) {
        artistsToCreate.push(artist);
      }
    });

    const trackToPush: Prisma.TrackCreateManyInput = {
      id: track.id,
      title: track.name,
      audio_FeaturesId: afInDb
        .map((af) => af.id)
        .find((af) => af === "AUDIOFEATURES_" + track.id),
    };

    dbTracks.push(trackToPush);
  });

  await prisma.artist.createMany({
    data: artistsToCreate,
    skipDuplicates: true,
  });

  const tracksCreated = await prisma.track.createMany({
    data: dbTracks,
    skipDuplicates: true,
  });

  if (tracksCreated.count > 0) {
    const allRelations = await prisma.$queryRaw<
      { A: string; B: string }[]
    >`SELECT * FROM _artisttotrack;`;

    coolStuffToCreate = coolStuffToCreate.filter((e, i, arr) => {
      return (
        arr.findIndex(
          (item) => item.artist === e.artist && item.track === e.track
        ) === i &&
        !allRelations.find((item) => item.A === e.artist && item.B === e.track)
      );
    });

    const values = coolStuffToCreate
      .map((item) => `('${item.artist}', '${item.track}')`)
      .join(",");

    if (values.includes(";")) {
      console.log("semicolon spotted");
      return;
    }

    const rawQuery = `INSERT INTO _artisttotrack (A, B) VALUES ${values};`;

    await prisma.$executeRawUnsafe(rawQuery);
  }

  await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    include: {
      tracks: true,
    },
    data: {
      tracks: {
        connect: tracks.map((item) => ({ id: item.id })),
      },
    },
  });

  await prisma.playlist.findFirst({
    where: {
      id: playlistId,
    },
  });
};
