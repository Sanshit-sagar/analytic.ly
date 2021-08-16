import React, { useState, useContext } from "react";
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

import { 
  useTimeseries, 
  // Clickstream, 
  XYTimeSeries 
} from "../hooks/useClicks";
import  ControlPanel from './ControlPanel'
import { daysInMonth } from "../lib/utils/dateUtils";

type Key = "a" | "b";
type Datum = { 
  x: string, 
  y: number,
  key: Key, 
  date: number, 
  month: number,
  hour: number 
};


const customTheme = buildChartTheme({
  backgroundColor: "red",
  colors: ["#edffea", "blue"],
  gridColor: "gray",
  gridColorDark: "black",
  svgLabelSmall: { fill: "#fff" },
  svgLabelBig: { fill: "#fe9" },
  tickLength: 4
});

const ChartBackground = ({ patternId }: { patternId: string }) => {
  const { theme, width, height, margin, innerHeight, innerWidth } = useContext(DataContext);
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
        rx={15} ry={15}
        fill={theme?.backgroundColor ?? "#fff"}
      >
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.40}
      />
      </rect>
    </>
  );
};

const API_BASE = 'http://localhost:3000/api/metrics/clickstream/recent/'
// const RECENT_CLICKS_PATH = 'clicks/recents/'
// '48/hours'

const Chart = ({ width = 500, height = 250, xAccessor = (d: Datum) => d.x, yAccessor = (d: Datum) => d.y }) => {
  const [clicksEndpoint, setClicksEndpoint] = useState(`${API_BASE}/48/hours`)

  const handleEndpointUpdate = (updatedTimeAndUnits: string) => {
      setClicksEndpoint(`${API_BASE}/${updatedTimeAndUnits}`);
  }

  const { timeseries, loading, error }: XYTimeSeries = useTimeseries(clicksEndpoint);

  let startDate: number | undefined = timeseries?.length ? timeseries[0]?.date : undefined
  let startMonth: number | undefined = timeseries?.length ? timeseries[0]?.month : undefined

  const formatTimeLabel = (index: number): number | string => {
    if(!startDate) return 'loading...';
    return (index + 1)%24;
  }

  const formatDateLabel = (index: number): number | string => {
    if(!startDate) return 'loading...';
    return Math.floor(startDate + (index + 1)/24); // todo add month and modulo month 
  }

  const formatMonthLabel = (index: number) => {
    if(!startDate || !startMonth) return 'loading...';
    return parseInt(`${formatDateLabel(index)}`)%daysInMonth(startMonth)
  }

  const tooltipDateLabel = (i: number) => {
    return `${formatDateLabel(i)}/${formatMonthLabel(i)}`;
  }

  const tooltipTimeLabel = (i: number): string => {
    const isSingleDigit = formatDateLabel(i) < 10
    return isSingleDigit ? `0${formatTimeLabel(i)}` : `${formatTimeLabel(i)}:00`; 
  }

  const dataA: Datum[] = new Array(48).fill(null).map((_, i) => ({
    key: "Clicks",
    x: `${tooltipDateLabel(i)}, ${tooltipTimeLabel(i)}`,
    y: (timeseries?.length && i <timeseries.length && timeseries[i]) ? timeseries[i].y : 0
  }));

  
  return (
    <>
      
      <XYChart
        margin={{ top: 15, right: 25, bottom: 50, left: 25 }}
        width={width}
        height={height}
        xScale={{ type: "band", paddingInner: 0.5 }}
        yScale={{ type: "linear" }}
        theme={customTheme}
      >
        <ChartBackground patternId="background-id" />
        <AnimatedGrid numTicks={6} columns={true} />
        {!loading && !error && timeseries &&
          <LineSeries
            dataKey="Clicks"
            data={dataA}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
          />
        }
        <AnimatedAxis orientation="bottom" numTicks={10} />
        <Tooltip<Datum>
          showVerticalCrosshair
          snapTooltipToDatumX
          renderTooltip={({ tooltipData, colorScale }) => (
            <div style={{ backgroundColor: 'black', padding: '5px', borderRadius: '3.5px' }}>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              <br />
              {xAccessor(tooltipData.nearestDatum.datum)}:{" "}
              {yAccessor(tooltipData.nearestDatum.datum).toFixed(2)}
            </div>
          )}
        />
      </XYChart>  
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <ControlPanel updateEndpoint={handleEndpointUpdate} /> 
      </div> 
    </>
  );
};

export default Chart;

