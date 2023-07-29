"use client";

import React, { useEffect, useState } from "react";
import { playlistAnalysis2 } from "../../../../server-actions/playlistAnalysis.action";
import { PreCalculatedBoxPlot } from "@/components/boxplot";
import { theme } from "../../../../../tailwind.config";
import { LoadingComponent } from "@/components/loading";
import { Playlist } from "@prisma/client";
import { getPlaylistInfowithId } from "@/server-actions/playlistOverview.action";
import Image from "next/image";
import { addCompletePlaylistToDbAction } from "@/server-actions/playlistPreview.action";

export default function PlaylistDetail({ params }: { params: { id: string } }) {
  const [boxplotData, setBoxplotData] = useState<
    StatisticalBoxPlotProps[] | null
  >(null);
  const [triedQuery, setTriedQuery] = useState(false);
  const [playlistData, setPlaylistData] = useState<
    (Playlist & { trackCount: number }) | null
    >(null);
  
  const getData = async () => {
    setBoxplotData((await playlistAnalysis2(params.id)) ?? null);
    setPlaylistData((await getPlaylistInfowithId(params.id)) ?? null);
    setTriedQuery(true);
  }

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [params.id]);

  const handlePlaylistClick = async () => {
    setBoxplotData(null);
    const res = await addCompletePlaylistToDbAction(params.id);
    
    if (!res) {
      alert("something went wrong");
      return;
    }

    await getData();
  };

  return (
    <div className="mb-20 px-2 flex flex-col">
      {playlistData && (
        <>
          <div className="flex border-b border-textDark w-full p-2">
            <div className="w-1/3">
              <Image
                src={playlistData.coverLink}
                alt="the users profile picture"
                width={200}
                height={200}
                className="rounded-2xl border border-textLight drop-shadow-cover -z-10"
              />
            </div>
            <div className="text-textDark flex flex-col items-start ml-5 w-2/3">
              <p className="text-xl truncate w-full">{playlistData.title}</p>
              <p className="truncate w-full">{playlistData.trackCount} tracks</p>
              <p className="truncate w-full">creator: {playlistData.creatorName}</p>
            </div>
          </div>
          <button
            className="text-textDark border border-textDark px-3 py-1 mx-auto rounded-xl mt-1"
            onClick={handlePlaylistClick}>
            (Re)query Songs
          </button> 
        </>
      )}
      {
        boxplotData ? (
        boxplotData.map((data, i) => (
          <div key={i} className="text-textDark mt-3">
            <h1>{data.name}</h1>
            <PreCalculatedBoxPlot
              {...{
                ...data,
                textColor: theme.extend.colors.textDark,
                boxColor: theme.extend.colors.primary,
                medianColor: theme.extend.colors.textLight,
                svgHeight: 100,
                svgWidth: 380,
              }}
              key={i}
            />
          </div>
        ))
      ) : triedQuery ? (
        <div className="text-textDark mt-3">
          <p>No songs in the DB please query using the button above</p>
        </div>
      ) : ""}
      {!triedQuery && <LoadingComponent />}
    </div>
  );
}

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
