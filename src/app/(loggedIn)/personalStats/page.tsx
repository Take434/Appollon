import BoxPlot from "@/components/boxplot";
import React from "react";

export default function PersonalStats() {
  return (
    <div className="text-textDark flex flex-col items-center justify-center">
      <h1>Personal Stats</h1>
      <div className="mt-20 grid grid-cols-1 gap-5">
        <BoxPlot
          data={[
            2.323, 2, 4, 2, 1.43, 2.12, 5.323, 1.123, 2.234, 3.092, 2.32, 3.23,
            2.32,
          ]}
          scale={[1, 2, 3, 4, 5, 6, 7]}
        />
        <BoxPlot
          data={[
            80, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 90, 70, 80, 90,
            100, 100, 100, 180, 180, 180, 170, 150,
          ]}
          scale={[60, 80, 100, 120, 140, 160, 180]}
        />
      </div>
    </div>
  );
}
