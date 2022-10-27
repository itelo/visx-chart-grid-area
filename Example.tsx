import React from "react";
import { CityTemperature } from "@visx/mock-data/lib/mocks/cityTemperature";

import ExampleControls from "./ExampleControls";
import CustomChartBackground from "./CustomChartBackground";

export type XYChartProps = {
  width: number;
  height: number;
};

type City = "San Francisco" | "New York" | "Austin";

export default function Example({ height }: XYChartProps) {
  return (
    <ExampleControls>
      {({
        accessors,
        // animationTrajectory,
        config,
        curve,
        data,
        numTicks,
        theme,
        xAxisOrientation,
        yAxisOrientation,

        // components are animated or not depending on selection
        AreaSeries,
        Axis,
        Tooltip,
        XYChart
      }) => (
        <XYChart
          theme={theme}
          xScale={config.x}
          yScale={config.y}
          height={Math.min(400, height)}
        >
          <CustomChartBackground />
          {/* <Grid
            key={`grid-${animationTrajectory}`} // force animate on update
            rows={false}
            columns={true}
            // animationTrajectory={animationTrajectory}
            numTicks={numTicks}
          /> */}

          <>
            <AreaSeries
              dataKey="Austin"
              data={data}
              xAccessor={accessors.x.Austin}
              yAccessor={accessors.y.Austin}
              fillOpacity={0.4}
              curve={curve}
            />
            <AreaSeries
              dataKey="New York"
              data={data}
              xAccessor={accessors.x["New York"]}
              yAccessor={accessors.y["New York"]}
              fillOpacity={0.4}
              curve={curve}
            />
            <AreaSeries
              dataKey="San Francisco"
              data={data}
              xAccessor={accessors.x["San Francisco"]}
              yAccessor={accessors.y["San Francisco"]}
              fillOpacity={0.4}
              curve={curve}
            />
          </>

          <>
            {/* <LineSeries
              dataKey="Austin"
              data={data}
              xAccessor={accessors.x.Austin}
              yAccessor={accessors.y.Austin}
              curve={curve}
            /> */}

            {/* <LineSeries
              dataKey="New York"
              data={data}
              xAccessor={accessors.x["New York"]}
              yAccessor={accessors.y["New York"]}
              curve={curve}
            /> */}
            {/* <LineSeries
              dataKey="San Francisco"
              data={data}
              xAccessor={accessors.x["San Francisco"]}
              yAccessor={accessors.y["San Francisco"]}
              curve={curve}
            /> */}
          </>
          <Axis
            key={`time-axis-center`}
            orientation={xAxisOrientation}
            numTicks={numTicks}
            animationTrajectory="center"
          />
          <Axis
            key={`temp-axis-center`}
            label={"Temperature (°F)"}
            orientation={yAxisOrientation}
            numTicks={numTicks}
            animationTrajectory="center"
          />
          <Tooltip<CityTemperature>
            showHorizontalCrosshair
            showVerticalCrosshair
            snapTooltipToDatumX
            snapTooltipToDatumY
            showDatumGlyph
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <>
                {/** date */}
                {(tooltipData?.nearestDatum?.datum &&
                  accessors.date(tooltipData?.nearestDatum?.datum)) ||
                  "No date"}
                <br />
                <br />
                {/** temperatures */}
                {(Object.keys(tooltipData?.datumByKey ?? {}).filter(
                  (city) => city
                ) as City[]).map((city) => {
                  const temperature =
                    tooltipData?.nearestDatum?.datum &&
                    accessors["y"][city](tooltipData?.nearestDatum?.datum);

                  return (
                    <div key={city}>
                      <em
                        style={{
                          color: colorScale?.(city),
                          textDecoration:
                            tooltipData?.nearestDatum?.key === city
                              ? "underline"
                              : undefined
                        }}
                      >
                        {city}
                      </em>{" "}
                      {temperature == null || Number.isNaN(temperature)
                        ? "–"
                        : `${temperature}° F`}
                    </div>
                  );
                })}
              </>
            )}
          />
        </XYChart>
      )}
    </ExampleControls>
  );
}
