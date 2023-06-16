"use client";

import { apiArtist } from "@/models/apiModels/apiArtist";
import { apiArtistsObject } from "@/models/apiModels/apiArtistsObject";
import { apiSavedTracks } from "@/models/apiModels/apiSavedTracks";
import { apiTrackAudioFeatures } from "@/models/apiModels/apiTrackAudioFeatures";
import { audioFeaturesForTracks } from "@/server-actions/api-actions.ts/audioFeaturesForTracks.action";
import {
  apiTestingAction,
  apiTrackAudioFeaturesForSavedTracks,
  apiUserArtistsAction,
  getSavedTracks,
} from "@/server-actions/apiTest.action";
import { trackAnalysis } from "@/server-actions/server-actions.ts/trackAnalysis.actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

export default function Home() {
  const [displayData, setDisplayData] = useState<
    | z.infer<typeof apiArtistsObject>
    | z.infer<typeof apiArtist>
    | z.infer<typeof apiSavedTracks>
    | z.infer<typeof apiTrackAudioFeatures>
    | null
    | number
  >(null);

  const { push } = useRouter();

  return (
    <div>
      <button
        onClick={() => {
          apiUserArtistsAction().then((data) => {
            if (data === "No token found") {
              console.log("No token found");
              push("/login");
              return;
            }
            setDisplayData(data as z.infer<typeof apiArtistsObject>);
          });
        }}
      >
        artistsUser
      </button>
      trackAnalysis
      <button
        onClick={() => {
          apiTestingAction().then((data) => {
            if (data === "No token found") {
              console.log("No token found");
              push("/login");
              return;
            }
            setDisplayData(data as z.infer<typeof apiArtist>);
          });
        }}
      >
        artist
      </button>
      <button
        onClick={() => {
          getSavedTracks().then((data) => {
            if (data === "No token found") {
              console.log("No token found");
              push("/login");
              return;
            }
            setDisplayData(data as z.infer<typeof apiSavedTracks>);
          });
        }}
      >
        savedTracks
      </button>
      <button
        onClick={() => {
          apiTrackAudioFeaturesForSavedTracks().then((data) => {
            if (data === "No token found") {
              console.log("No token found");
              push("/login");
              return;
            }
            setDisplayData(data as z.infer<typeof apiTrackAudioFeatures>);
          });
        }}
      >
        savedTracksAudioFeatures
      </button>
      <button
        onClick={() => {
          getSavedTracks().then((savedTracks) => {
            if (savedTracks === "No token found") {
              console.log("No token found");
              push("/login");
              return;
            }
            audioFeaturesForTracks(
              savedTracks!.items.map((t) => t.track.id)
            ).then((audioFeatures) => {
              if (audioFeatures === "No token found") {
                console.log("No token found");
                push("/login");
                return;
              }
              setDisplayData(
                audioFeatures as z.infer<typeof apiTrackAudioFeatures>
              );
            });
          });
        }}
      >
        T----T
      </button>
      <button
        onClick={() => {
          trackAnalysis().then((data) => {
            if (!data) {
              console.log("No token found");
              push("/login");
              return;
            }
            setDisplayData(data);
          });
        }}
      >
        asdnjas kjuidhnausdhnauisdjashd
      </button>
      <br />
      {JSON.stringify(displayData)}
    </div>
  );
}
