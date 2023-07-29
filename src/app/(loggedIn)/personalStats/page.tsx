import {
  BoxPlotWithoutPopover,
  BoxPlotWithPopover,
} from "@/components/boxplot";
import React from "react";
import { theme } from "../../../../tailwind.config";

export default function PersonalStats() {
  return (
    <div className="text-textDark flex flex-col items-center justify-center px-2">
      <h1 className="text-3xl">Personal Stats</h1>
      <p>
        This is currently only demoing the boxplot components and not actually
        displaying user data
      </p>
      <div className="mt-20 grid grid-cols-1 gap-5">
        <BoxPlotWithoutPopover
          data={[
            2.323, 2, 4, 2, 1.43, 2.12, 5.323, 1.123, 2.234, 3.092, 2.32, 3.23,
            2.32,
          ]}
          scale={[1, 2, 3, 4, 5, 6, 7]}
          textColor={theme.extend.colors.textDark}
          boxColor={theme.extend.colors.primary}
          medianColor={theme.extend.colors.textLight}
          svgHeight={100}
          svgWidth={384}
        />
        <BoxPlotWithoutPopover
          data={[
            80, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 90, 70, 80, 90,
            100, 100, 100, 180, 180, 180, 170, 150,
          ]}
          scale={[60, 80, 100, 120, 140, 160, 180]}
          textColor={theme.extend.colors.textDark}
          boxColor={theme.extend.colors.primary}
          medianColor={theme.extend.colors.textLight}
          svgHeight={100}
          svgWidth={384}
        />
        <BoxPlotWithoutPopover
          data={[
            90, 100, 110, 120, 130, 140, 150, 160, 90, 90, 140, 160, 150, 160,
            100, 100, 100, 180, 180, 180, 170, 150,
          ]}
          scale={[60, 80, 100, 120, 140, 160, 180]}
          textColor={theme.extend.colors.textDark}
          boxColor={theme.extend.colors.primary}
          medianColor={theme.extend.colors.textLight}
          svgHeight={100}
          svgWidth={384}
        />
        <BoxPlotWithPopover
          data={[
            0, 0.1, 0.234, 0.253, 0.5, 0.74, 0.64, 0.56, 0.34, 0.23, 0.12, 0.1,
          ]}
          scale={[0, 0.2, 0.4, 0.6, 0.8, 1]}
          textColor={theme.extend.colors.textDark}
          boxColor={theme.extend.colors.primary}
          medianColor={theme.extend.colors.textLight}
          svgHeight={100}
          svgWidth={384}
        />
      </div>
    </div>
  );
}
