"use server";

import { audioFeaturesForTracks } from "../api-actions.ts/audioFeaturesForTracks.action";
import { getSavedTracks } from "../api-actions.ts/savedTracks.action";

export const trackAnalysis = async () => {
  "use server";

  const savedTracks = await getSavedTracks();

  if (savedTracks === "No token found" || !savedTracks) {
    console.log("No token found");
    return;
  }

  const audioFeatures = await audioFeaturesForTracks(
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

  return  (duration_ms / audioFeatures.length / 1000);
};
