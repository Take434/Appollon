"use server";

import { apiTrack } from "@/models/apiModels/apiTrack";
import { Artist, Audio_Features, Prisma, Track } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";
import { getAudioFeaturesForTracks } from "./api-utils/getAudioFeaturesForPlaylists.util";
import { getClient } from "@/prismaClient";
import { getSavedTracks } from "./api-utils/getSavedTracks.util";
import { setTimeout } from "timers/promises";
import { getTracksForPlaylist } from "./api-utils/getTracksForPlaylist.util";

export const addCompletePlaylistToDb = async (playlistId: string) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const apiTracks: z.infer<typeof apiTrack>[] = [];

  if (!apiTracks) {
    return;
  }

  if (playlistId.includes("SAVEDTRACKS")) {
    const savedTracks = await getSavedTracks();

    if (savedTracks === "No token found") {
      return "No token found";
    }

    if (!savedTracks) {
      return;
    }

    apiTracks.push(...savedTracks);
  } else {
    const tracksForPlaylist = await getTracksForPlaylist(playlistId);

    if (tracksForPlaylist === "No token found") {
      return "No token found";
    }

    if (!tracksForPlaylist) {
      return;
    }

    apiTracks.push(...tracksForPlaylist);
  }

  const prisma = getClient();

  const allTracksInDb = await prisma.track.findMany({
    select: {
      id: true,
    },
  });

  const filteredApiTracks = apiTracks.filter((track, index, tracks) => {
    return (
      !allTracksInDb.find((trackInDb) => trackInDb.id === track.id) &&
      tracks.findIndex((item) => item.id === track.id) === index
    );
  });

  if (filteredApiTracks.length > 0) {
    const audioFeatures = await createAudioFeaturesForTracks(
      filteredApiTracks.map((item) => item.id)
    );

    console.log("_------------------------------_");

    if (audioFeatures === "No token found") {
      return "No token found";
    }

    if (!audioFeatures) {
      return;
    }

    await createArtistsForTracks(filteredApiTracks);

    await createTracks(filteredApiTracks, audioFeatures);

    await createArtistRelationForTracks(filteredApiTracks);
  }

  await updatePlaylistRelationForPlaylist(playlistId, apiTracks);
};

export const updatePlaylistRelationForPlaylist = async (
  playlistId: string,
  tracks: z.infer<typeof apiTrack>[]
) => {
  const prisma = getClient();

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
};

export const createArtistRelationForTracks = async (
  tracks: z.infer<typeof apiTrack>[]
) => {
  const prisma = getClient();

  const relationsToCreate = tracks
    .map((track) => {
      return track.artists.map((artist) => {
        return {
          A: artist.id,
          B: track.id,
        } as { A: string; B: string };
      });
    })
    .flat();

  const values = relationsToCreate
    .map((item) => `('${item.A}', '${item.B}')`)
    .join(",");

  const rawQuery = `INSERT INTO _artisttotrack (A, B) VALUES ${values};`;

  await prisma.$executeRawUnsafe(rawQuery);
};

export const createArtistsForTracks = async (
  tracks: z.infer<typeof apiTrack>[]
) => {
  const prisma = getClient();

  const artistsToCreate = tracks
    .map((item) => item.artists)
    .flat()
    .map((artist) => {
      return {
        id: artist.id,
        name: artist.name,
      } as Prisma.ArtistCreateManyInput;
    });

  await prisma.artist.createMany({
    data: artistsToCreate,
    skipDuplicates: true,
  });
};

export const createTracks = async (
  tracks: z.infer<typeof apiTrack>[],
  audioFeatures: Audio_Features[]
) => {
  const prisma = getClient();

  const tracksToCreate = tracks.map((track) => {
    return {
      id: track.id,
      title: track.name,
      audio_FeaturesId:
        audioFeatures.find((item) => item.id === "AUDIOFEATURES_" + track.id)?.id ??
        null,
    } as Prisma.TrackCreateManyInput;
  });

  console.log(tracksToCreate);

  await prisma.track.createMany({
    data: tracksToCreate,
    skipDuplicates: true,
  });
};

export const createAudioFeaturesForTracks = async (trackIds: string[]) => {
  const audioFeaturesForTracks = await getAudioFeaturesForTracks(trackIds);

  if (audioFeaturesForTracks === "No token found") {
    return "No token found";
  }

  if (!audioFeaturesForTracks) {
    return;
  }

  const prisma = getClient();

  await prisma.audio_Features.createMany({
    data: audioFeaturesForTracks.map((item) => {
      return {
        ...item,
        id: item.id,
      } satisfies Audio_Features;
    }),
    skipDuplicates: true,
  });

  return audioFeaturesForTracks;
};
