"use client";

/* eslint-disable tsdoc/syntax */
import React from "react";
import { Popover } from "@headlessui/react";

type StylingProps = {
  textColor: string;
  boxColor: string;
  medianColor: string;
};

type DataProps = {
  data: number[];
  scale: number[];
};

type StatisticalBoxPlotProps = {
  median: number;
  q1: number;
  q3: number;
  lowerWhisker: number;
  upperWhisker: number;
  outliers: number[];
  scaleStep: number;
  svgWidth: number;
  svgHeight: number;
  offset: number;
  scale: number[];
};

/**
 * The basic boxplot component, which takes in data and a scale and generates a boxplot.
 * This is used by other components to generate different verisons of boxplot (e.g. with / without popover).
 */
const BoxPlot = (props: StylingProps & StatisticalBoxPlotProps) => {
  return (
    <div className="w-full">
      <svg width={props.svgWidth} height={props.svgHeight}>
        <line
          x1={`${props.lowerWhisker}%`}
          y1="0%"
          x2={`${props.lowerWhisker}%`}
          y2="60%"
          stroke={props.textColor}
          strokeWidth="2"
        />
        <line
          x1={`${props.upperWhisker}%`}
          y1="0%"
          x2={`${props.upperWhisker}%`}
          y2="60%"
          stroke={props.textColor}
          strokeWidth="2"
        />
        <line
          x1={`${props.lowerWhisker}%`}
          y1="30%"
          x2={`${props.upperWhisker}%`}
          y2="30%"
          stroke={props.textColor}
          strokeWidth="2"
        />
        <rect
          x={`${props.q1}%`}
          y="0%"
          width={`${props.q3 - props.q1}%`}
          height="60%"
          fill={props.boxColor}
        />
        <line
          x1={`${props.median}%`}
          y1="0%"
          x2={`${props.median}%`}
          y2="60%"
          stroke={props.medianColor}
          strokeWidth="2"
        />
        {
          //generate the outliers
          props.outliers.map((outlier, index) => (
            <circle
              key={index}
              cx={`${outlier}%`}
              cy="30%"
              r="1%"
              fill={props.textColor}
            />
          ))
        }
        {
          //generate the steps of the scale
          props.scale.map((step, index) => (
            <g key={index}>
              <line
                x1={`${index * props.scaleStep + props.offset}%`}
                y1="79%"
                x2={`${index * props.scaleStep + props.offset}%`}
                y2="85%"
                stroke={props.textColor}
                strokeWidth="1"
              />
              <svg
                x={`${
                  index * props.scaleStep + props.offset - props.scaleStep / 2
                }%`}
                y="85%"
                width={`${props.scaleStep}%`}
                height="30%"
                fill={props.textColor}
              >
                <text
                  x="50%"
                  y="50%"
                  fontSize="1rem"
                  textAnchor="middle"
                  fill={props.textColor}
                  textRendering={"geometricPrecision"}
                >
                  {step}
                </text>
              </svg>
            </g>
          ))
        }
        <line
          x1={`${props.offset}%`}
          y1="80%"
          x2={`${(props.scale.length - 1) * props.scaleStep + props.offset}%`}
          y2="80%"
          stroke={props.textColor}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export const BoxPlotWithoutPopover = (props: StylingProps & DataProps) => {
  const stats = calculateData(props.data, props.scale);
  console.log(stats);
  return <BoxPlot {...{ ...stats, ...props }} />;
};

export const BoxPlotWithPopover = (props: StylingProps & DataProps) => {
  const stats = calculateData(props.data, props.scale);

  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        <BoxPlot {...{ ...stats, ...props }} />
      </Popover.Button>

      <Popover.Panel>
        <Popover.Button className="absolute z-10 w-full top-0 bg-black bg-opacity-80 pl-3">
          <div className="grid grid-cols-2 justify-items-start">
            <p className="col-span-2 justify-self-center">Stats:</p>
            <p>left whisker: {stats.lowerWhisker}</p>
            <p>right whisker: {stats.upperWhisker}</p>
            <p>q1: {stats.q1}</p>
            <p>q3: {stats.q3}</p>
            <p>median: {stats.median}</p>
            <p>amount of outliers: {stats.outliers.length}</p>
          </div>
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
};

/**
 * Calculates the statistical data for the boxplot.
 * This includes the median, q1, q3, lowerWhisker, upperWhisker and outliers.
 * The outliers are defined as any data point that is more than 1.5 * IQR away from the q1 or q3.
 * @param data The data to calculate the boxplot for.
 * @param scale The scale to use for the boxplot.
 * @returns The statistical data for the boxplot.
 */
const calculateData = (data: number[], scale: number[]) => {
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
    median: data[Math.floor(data.length / 2)],
    q1: q1,
    q3: q3,
    lowerWhisker: lowerWhisker,
    upperWhisker: upperWhisker,
    outliers: data.filter((x) => x < lowerWhisker || x > upperWhisker),
    svgWidth: 384,
    svgHeight: 100,
    scaleStep: 92 / (scale.length - 1),
    offset: offset,
    scale: scale,
  };
};
