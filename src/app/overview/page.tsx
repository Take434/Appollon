"use client";

import { playlistPreview } from "@/server-actions/playlistPreview.action";
import { Audio_Features, Playlist } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trackAnalysis } from "@/server-actions/trackAnalysis.actions";
import React from "react";
import { playlistAnalysis, playlistAnalysis2 } from "@/server-actions/playlistAnalysis.action";
import { getTracksForPlaylist } from "@/utils/api-utils/getTracksForPlaylist.util";
import { addCompletePlaylistToDb } from "@/utils/getTracks.util";

export default function Home() {
  const [userPlaylistData, setUserPlaylistData] = useState<null | Playlist[]>();
  const [userAudioFeatureData, setUserAudioFeatureData] = useState<
    null | Audio_Features
  >();

  const { push } = useRouter();

  return (
    <div>
      <button
        onClick={() => {
          playlistPreview().then((data) => {
            if (data === "No token found") {
              console.log("No token found");
              push("/login");
              return;
            }
            if (!data) {
              return;
            }
            setUserPlaylistData(data);
          });
        }}
      >
        testButton
      </button>
      <button
        onClick={() => {
          addCompletePlaylistToDb("SAVEDTRACKS_jonas_giesen").then((data) => {
            setUserAudioFeatureData(null);
          });
        }}
      >
        Audio Features for SAVEDTRACKS_jonas_giesen
      </button>
      <br />
      <div>{JSON.stringify(userPlaylistData)}</div>
      <br />
      <div>{JSON.stringify(userAudioFeatureData)}</div>
    </div>
  );
}
