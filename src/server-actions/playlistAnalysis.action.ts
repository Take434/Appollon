"use server";

import { getClient } from "@/prismaClient";
import {
  getAudioFeaturesForPlaylist,
  getAudioFeaturesForTracks,
} from "@/utils/api-utils/getAudioFeaturesForPlaylists.util";
import { createAudioFeaturesForPlaylist } from "@/utils/createAudioFeaturesForPlaylist.util";
import { Audio_Features } from "@prisma/client";

export const playlistAnalysis = async (playlistId: string) => {
  const prisma = getClient();

  const currentPlaylist = await prisma.playlist.findFirst({
    where: {
      id: playlistId,
    },
    select: {
      audio_features: true,
    },
  });

  if (currentPlaylist?.audio_features === null) {
    const result = await createAudioFeaturesForPlaylist(playlistId);

    if (!result) {
      console.log("error creating audio feature for playlist");
      return;
    }

    return result;
  }

  return currentPlaylist!.audio_features;
};

export const playlistAnalysis2 = async (playlistId: string) => {
  const audioFeatures = await getAudioFeaturesForPlaylist(playlistId);

  if (!audioFeatures) {
    return;
  }

  const data: StatisticalBoxPlotProps[] = [];

  const allFeatures = {
    danceability: {
      data: [],
      scale: [0, 0.25, 0.5, 0.75, 1],
    },
    energy: {
      data: [],
      scale: [0, 0.25, 0.5, 0.75, 1],
    },
    instrumentalness: {
      data: [],
      scale: [0, 0.25, 0.5, 0.75, 1],
    },
    loudness: {
      data: [],
      scale: [-20, -15, -10, -5, 0],
    },
    tempo: {
      data: [],
      scale: [50, 75, 100, 125, 150, 175, 200],
    },
    valence: {
      data: [],
      scale: [0, 0.25, 0.5, 0.75, 1],
    },
    duration_ms: {
      data: [],
      scale: [0, 100000, 200000, 300000, 400000, 500000],
    },
  };

  audioFeatures.forEach((af) => {
    if (!af) {
      return;
    }

    Object.keys(af).forEach((key) => {
      if (key !== "id") {
        (
          Reflect.get(allFeatures, key) as { data: number[]; scale: number[] }
        ).data.push(Reflect.get(af, key));
      }
    });
  });

  Object.keys(allFeatures).forEach((key) => {
    data.push(getBoxPlotData(Reflect.get(allFeatures, key), key));
  });

  return data;
};

const getBoxPlotData = (
  { data, scale }: { data: number[]; scale: number[] },
  name: string
): StatisticalBoxPlotProps => {
  const offset = 3;

  data.sort((a, b) => a - b);
  scale.sort((a, b) => a - b);
  data = data.map(
    (x) => ((x - scale[0]) / (scale[scale.length - 1] - scale[0])) * 92 + offset
  );

  const min = data[0];
  const max = data[data.length - 1];
  const q1 = data[Math.floor(data.length / 4)];
  const q3 = data[Math.floor((3 * data.length) / 4)];
  const iqr = q3 - q1;
  const lowerWhisker = Math.max(min, q1 - 1.5 * iqr);
  const upperWhisker = Math.min(max, q3 + 1.5 * iqr);

  return {
    name: name,
    median: data[Math.floor(data.length / 2)],
    q1: q1,
    q3: q3,
    lowerWhisker: lowerWhisker,
    upperWhisker: upperWhisker,
    outliers: data.filter((x) => x < lowerWhisker || x > upperWhisker),
    scaleStep: 92 / (scale.length - 1),
    offset: offset,
    scale: scale,
  };
};

type StatisticalBoxPlotProps = {
  name: string;
  median: number;
  q1: number;
  q3: number;
  lowerWhisker: number;
  upperWhisker: number;
  outliers: number[];
  scaleStep: number;
  offset: number;
  scale: number[];
};
