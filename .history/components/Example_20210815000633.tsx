import React, { useContext } from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  buildChartTheme,
  DataContext,
  LineSeries,
  Tooltip,
  XYChart
} from "@visx/xychart";
import { PatternLines } from "@visx/pattern";

import { useClicks } from "../hooks/useClicks";
import  ControlPanel from './Clicks';

type Key = "a" | "b";
type Datum = { x: string; y: number; key: Key };

const dataA: Datum[] = new Array(24).fill(null).map((_, i) => ({
  key: "a",
  x: `${i + 1 < 10 ? `0${i + 1}` : i + 1}:00`,
  y: 100 * Math.random() * i + 50
}));

const customTheme = buildChartTheme({
  backgroundColor: "#3b6978",
  colors: ["#75daad", "#edffea"],
  gridColor: "#edffea",
  gridColorDark: "#75daad",
  svgLabelSmall: { fill: "#fff" },
  svgLabelBig: { fill: "#fff" },
  tickLength: 5
});

const ChartBackground = ({ patternId }: { patternId: string }) => {
  const { theme, width, height, margin, innerHeight, innerWidth } = useContext(
    DataContext
  );
  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
        orientation={["diagonal"]}
        stroke={theme?.gridStyles?.stroke}
        strokeWidth={1}
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={theme?.backgroundColor ?? "#fff"}
        fillOpacity={1}
      />
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.15}
      />
    </>
  );
};

const Chart = ({ width = 500, height = 250, xAccessor = (d: Datum) => d.x, yAccessor = (d: Datum) => d.y }) => {
  const [clicksEndpoint, setClicksEndpoint] = useState('http://localhost:3000/api/clicks/recents/48/hours')

  const handleEndpointUpdate = (updatedEndpoint: string) => {
      setClicksEndpoint(updatedEndpoint)
  }

  const { clicks, loading, error }: IClicksProps = useClicks(clicksEndpoint);
  
  return (
    <>
      <XYChart
        margin={{ top: 15, right: 15, bottom: 25, left: 15 }}
        width={width}
        height={height}
        xScale={{ type: "band", paddingInner: 0.5 }}
        yScale={{ type: "linear" }}
        theme={customTheme}
      >
        <ControlPanel updatedEndpoint={handleEndpointUpdate} />
        <ChartBackground patternId="background-id" />
        <AnimatedGrid numTicks={6} columns={true} />
       
        <AnimatedAxis orientation="bottom" numTicks={3} />
        <Tooltip<Datum>
          showVerticalCrosshair
          snapTooltipToDatumX
          renderTooltip={({ tooltipData, colorScale }) => (
            <>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              <br />
              {xAccessor(tooltipData.nearestDatum.datum)}:{" "}
              {yAccessor(tooltipData.nearestDatum.datum).toFixed(2)}
            </>
          )}
        />
      </XYChart>
    </>
  );
};

export default Chart;
