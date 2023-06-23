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

  // const nomramlizedData = data.map(
  //   (x) => ((x - data[0]) / (data[data.length - 1] - data[0])) * scale.length
  // );

  console.log(data);

  const min = data[0];
  const max = data[data.length - 1];
  const median = data[Math.floor(data.length / 2)];
  const q1 = data[Math.floor(data.length / 4)];
  const q3 = data[Math.floor((3 * data.length) / 4)];
  const iqr = q3 - q1;
  const lowerWhisker = Math.max(min, q1 - 1.5 * iqr);
  const upperWhisker = Math.min(max, q3 + 1.5 * iqr);
  const lowerOutliers = data.filter((x) => x < lowerWhisker);
  const upperOutliers = data.filter((x) => x > upperWhisker);
  const svgWidth = 384;
  const svgHeight = 100;
  const scaleSteps = 100 / (scale.length - 0.7);

  console.log({
    min,
    max,
    median,
    q1,
    q3,
    iqr,
    lowerWhisker,
    upperWhisker,
    lowerOutliers,
    upperOutliers,
  });

  return (
    <div className="text-textDark w-full">
      <svg width={svgWidth} height={svgHeight}>
        <line
          x1={`${lowerWhisker * scaleSteps + 1.2}%`}
          y1="0%"
          x2={`${lowerWhisker * scaleSteps + 1.2}%`}
          y2="60%"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={`${upperWhisker * scaleSteps + 1.2}%`}
          y1="0%"
          x2={`${upperWhisker * scaleSteps + 1.2}%`}
          y2="60%"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={`${lowerWhisker * scaleSteps + 1.2}%`}
          y1="30%"
          x2={`${upperWhisker * scaleSteps + 1.2}%`}
          y2="30%"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x={`${q1 * scaleSteps + 1.2}%`}
          y="0%"
          width={`${(q3 - q1) * scaleSteps}%`}
          height="60%"
          fill="pink"
        />
        <line
          x1={`${median * scaleSteps + 1.2}%`}
          y1="0%"
          x2={`${median * scaleSteps + 1.2}%`}
          y2="60%"
          stroke="black"
          strokeWidth="2"
        />
        {
          //generate the outliers
          lowerOutliers.map((outlier, index) => (
            <circle
              key={index}
              cx={`${outlier * scaleSteps + 1.2}%`}
              cy="30%"
              r="1%"
              fill="white"
            />
          ))
        }
        {
          //generate the outliers
          upperOutliers.map((outlier, index) => (
            <circle
              key={index}
              cx={`${outlier * scaleSteps + 1.2}%`}
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
                x1={`${index * scaleSteps + 1.2}%`}
                y1="79%"
                x2={`${index * scaleSteps + 1.2}%`}
                y2="85%"
                stroke="white"
                strokeWidth="1"
              />
              <text
                key={index}
                x={`${index * scaleSteps + 2.5}%`}
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
          x2={`${(scale.length - 1) * scaleSteps + 1.2}%`}
          y2="80%"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
