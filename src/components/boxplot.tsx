/* eslint-disable tsdoc/syntax */
import React from "react";

type BoxPlotProps = {
  data: number[];
  scale: number[];
};

/**
 * A component that renders a box plot as an svg.
 * The box plot is generated from the data and scale props.
 * @param data The data to be displayed in the box plot
 * @param scale The scale to be displayed on the x-axis
 * @returns A box plot
 */
export default function BoxPlot({ data, scale }: BoxPlotProps) {
  data.sort((a, b) => a - b);
  scale.sort((a, b) => a - b);

  data = data.map(
    (x) => ((x - scale[0]) / (scale[scale.length - 1] - scale[0])) * 100
  );

  console.log(data);

  const min = data[0];
  const max = data[data.length - 1];
  const median = data[Math.floor(data.length / 2)];
  const q1 = data[Math.floor(data.length / 4)];
  const q3 = data[Math.floor((3 * data.length) / 4)];
  const iqr = q3 - q1;
  const lowerWhisker = Math.max(min, q1 - 1.5 * iqr);
  const upperWhisker = Math.min(max, q3 + 1.5 * iqr);
  const outliers = data.filter((x) => x < lowerWhisker || x > upperWhisker);
  const svgWidth = 384;
  const svgHeight = 100;

  //x - min d. Skala / max - min d. Skala

  console.log({
    min,
    max,
    median,
    q1,
    q3,
    iqr,
    lowerWhisker,
    upperWhisker,
    outliers,
  });

  return (
    <div className="text-textDark w-full">
      <svg width={svgWidth} height={svgHeight}>
        <line
          x1={`${lowerWhisker}%`}
          y1="0%"
          x2={`${lowerWhisker}%`}
          y2="60%"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={`${upperWhisker}%`}
          y1="0%"
          x2={`${upperWhisker}%`}
          y2="60%"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={`${lowerWhisker}%`}
          y1="30%"
          x2={`${upperWhisker}%`}
          y2="30%"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x={`${q1}%`}
          y="0%"
          width={`${q3 - q1}%`}
          height="60%"
          fill="pink"
        />
        <line
          x1={`${median}%`}
          y1="0%"
          x2={`${median}%`}
          y2="60%"
          stroke="black"
          strokeWidth="2"
        />
        {
          //generate the outliers
          outliers.map((outlier, index) => (
            <circle
              key={index}
              cx={`${outlier}%`}
              cy="30%"
              r="1%"
              fill="white"
            />
          ))
        }
        {
          //generate the steps of the scale
          scale.map((step, index) => (
            <>
              <line
                key={index}
                x1={`${index}%`}
                y1="79%"
                x2={`${index}%`}
                y2="85%"
                stroke="white"
                strokeWidth="1"
              />
              <text
                key={index}
                x={`${index}%`}
                y="100%"
                fontSize="1rem"
                textAnchor="middle"
                fill="white"
                textRendering={"geometricPrecision"}
                dx="-0.3rem"
              >
                {step}
              </text>
            </>
          ))
        }
        <line
          x1="1.5%"
          y1="80%"
          x2={`${scale.length - 1}%`}
          y2="80%"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
