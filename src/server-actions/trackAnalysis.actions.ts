"use server";

import { getClient } from "@/prismaClient";
import { getAudioFeaturesForTracks } from "@/utils/api-utils/getAudioFeaturesForPlaylists.action";
import { getSavedTracks } from "@/utils/api-utils/getSavedTracks.action";

export const trackAnalysis = async () => {
  const savedTracks = await getSavedTracks();

  if (savedTracks === "No token found" || !savedTracks) {
    console.log("No token found");
    return;
  }

  const audioFeatures = await getAudioFeaturesForTracks(
    savedTracks.map((track) => track.id)
  );

  if (audioFeatures === "No token found" || !audioFeatures) {
    console.log("No token found");
    return;
  }

  let duration_ms = 0;

  audioFeatures.forEach((af) => {
    duration_ms += af.duration_ms;
  });

  return audioFeatures;
};

export const getTracksAnalysisForPlaylist = async (playlistId: string) => {
  const prisma = getClient();

  const currentPlaylist = await prisma.playlist.findFirst({
    where: {
      id: playlistId,
    },
  });

  if (!currentPlaylist) {
    console.log("Playlist not found");
    return;
  }

  if (currentPlaylist.audio_FeaturesId) {
    return currentPlaylist.audio_FeaturesId;
  }

  const audioFeatures = await getAudioFeaturesForTracks;
};
