/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { darkTheme, XYChartTheme } from "@visx/xychart";

import cityTemperature, {
  CityTemperature
} from "@visx/mock-data/lib/mocks/cityTemperature";

import { curveLinear, curveStep, curveCardinal } from "@visx/curve";

import userPrefersReducedMotion from "./userPrefersReducedMotion";
import getAnimatedOrUnanimatedComponents from "./getAnimatedOrUnanimatedComponents";

const dateScaleConfig = { type: "band", paddingInner: 0.3 } as const;
const temperatureScaleConfig = { type: "linear" } as const;
const numTicks = 6;
const data = cityTemperature.slice(225, 275);

const getDate = (d: CityTemperature) => d.date;
const getSfTemperature = (d: CityTemperature) => Number(d["San Francisco"]);
const getNyTemperature = (d: CityTemperature) => Number(d["New York"]);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);

type Accessor = (d: CityTemperature) => number | string;

interface Accessors {
  "San Francisco": Accessor;
  "New York": Accessor;
  Austin: Accessor;
}

type SimpleScaleConfig = { type: "band" | "linear"; paddingInner?: number };

type ProvidedProps = {
  accessors: {
    x: Accessors;
    y: Accessors;
    date: Accessor;
  };
  config: {
    x: SimpleScaleConfig;
    y: SimpleScaleConfig;
  };
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep;
  data: CityTemperature[];
  numTicks: number;
  theme: XYChartTheme;
  xAxisOrientation: "top" | "bottom";
  yAxisOrientation: "left" | "right";
} & ReturnType<typeof getAnimatedOrUnanimatedComponents>;

type ControlsProps = {
  children: (props: ProvidedProps) => React.ReactNode;
};

export default function ExampleControls({ children }: ControlsProps) {
  const useAnimatedComponents = !userPrefersReducedMotion();

  const xAxisOrientation: "top" | "bottom" = "bottom";
  const yAxisOrientation: "left" | "right" = "right";
  const curveType: "linear" | "cardinal" | "step" = "linear";
  const curveTypes = {
    cardinal: curveCardinal,
    step: curveStep,
    linear: curveLinear
  };
  const curve = curveTypes[curveType];

  const accessors = {
    x: {
      "San Francisco": getDate,
      "New York": getDate,
      Austin: getDate
    },
    y: {
      "San Francisco": getSfTemperature,
      "New York": getNyTemperature,
      Austin: getAustinTemperature
    },
    date: getDate
  };

  const config = {
    x: dateScaleConfig,
    y: temperatureScaleConfig
  };

  return (
    <>
      {children({
        accessors,
        config,
        curve,
        data: data,
        numTicks,
        theme: darkTheme,
        xAxisOrientation,
        yAxisOrientation,
        ...getAnimatedOrUnanimatedComponents(useAnimatedComponents)
      })}
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="pattern-lines">
        {/* <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={["vertical"]}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        /> */}
      </svg>
    </>
  );
}
