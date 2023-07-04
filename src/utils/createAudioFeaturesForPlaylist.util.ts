"use server";

import { getClient } from "@/prismaClient";
import { Audio_Features } from "@prisma/client";
import { getTracksForPlaylist } from "./api-utils/getTracksForPlaylist.util";
import { addCompletePlaylistToDb } from "./getTracks.util";

export const createAudioFeaturesForPlaylist = async (playlistId: string) => {
  const prisma = getClient();

  let playlist = await prisma.playlist.findFirst({
    where: {
      id: playlistId,
    },
    include: {
      tracks: {
        include: {
          audio_features: true,
        },
      },
    },
  });

  if (!playlist) {
    return;
  }

  if (playlist.tracks.length === 0) {
    await addCompletePlaylistToDb(playlistId);

    playlist = await prisma.playlist.findFirst({
      where: {
        id: playlistId,
      },
      include: {
        tracks: {
          include: {
            audio_features: true,
          },
        },
      },
    });

    if (!playlist) {
      return;
    }
  }

  let skippedAf = 0;

  const audioFeature = {} as Audio_Features;

  playlist!.tracks
    .map((item) => item.audio_features)
    .map((item) => {
      if (!item) {
        skippedAf++;
        return;
      }

      Object.keys(item).forEach((key) => {
        if (key !== "id") {
          const currentValue = Reflect.get(audioFeature, key) ?? 0;
          const newValue = currentValue + Reflect.get(item, key);
          Reflect.set(audioFeature, key, newValue);
        }
      });
    });

  Object.keys(audioFeature).map((key) => {
    let newValue =
      Reflect.get(audioFeature, key) / (playlist!.tracks.length - skippedAf);
    if (key === "duration_ms") {
      newValue = Math.floor(newValue);
    }
    Reflect.set(audioFeature, key, newValue);
  });

  (audioFeature.id = "AUDIOFEATURES_" + playlistId),
    await prisma.audio_Features.upsert({
      where: {
        id: "AUDIOFEATURES_" + playlistId,
      },
      create: audioFeature,
      update: audioFeature,
    });

  return audioFeature;
};
