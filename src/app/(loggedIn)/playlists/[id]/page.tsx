"use client";

import React, { useEffect, useState } from "react";
import { playlistAnalysis2 } from "../../../../server-actions/playlistAnalysis.action";
import { PreCalculatedBoxPlot } from "@/components/boxplot";
import { theme } from "../../../../../tailwind.config";

export default function Playlist({ params }: { params: { id: string } }) {
  const [boxplotData, setBoxplotData] = useState<StatisticalBoxPlotProps[] | null>(null);
  
  useEffect(() => {
    (async () => {
      setBoxplotData(await playlistAnalysis2(params.id) ?? null);
    })();
  }, [params.id]);

  return (
    <>
      {boxplotData && (
        boxplotData.map((data, i) => (
          <div className="text-textDark mt-3">
            <h1>{data.name}</h1>
            <PreCalculatedBoxPlot {...{ ...data, textColor: theme.extend.colors.textDark, boxColor: theme.extend.colors.primary, medianColor: theme.extend.colors.textLight, svgHeight: 100, svgWidth: 384 }} key={i} />
          </div>
        )
      )
      )}
    </>
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