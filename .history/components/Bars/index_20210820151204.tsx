import React from "react";
import { Bar } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { localPoint } from "@visx/event";

interface RecordVolumeEntry {
  bytes: number;
  date: string;
}

const recordVolumeData: RecordVolumeEntry[] = [
  { bytes: 32150980933, date: "2021-01-03" },
  { bytes: 40017505946, date: "2021-01-04" },
  { bytes: 44809205087, date: "2021-01-05" },
  { bytes: 59494022205, date: "2021-01-06" },
  { bytes: 57989955533, date: "2021-01-07" },
  { bytes: 56404994039, date: "2021-01-08" },
  { bytes: 53972820265, date: "2021-01-09" },
  { bytes: 53990268912, date: "2021-01-10" },
  { bytes: 55333372746, date: "2021-01-11" },
  { bytes: 56212847362, date: "2021-01-12" },
  { bytes: 45957839253, date: "2021-01-13" },
  { bytes: 32409456337, date: "2021-01-14" },
  { bytes: 31022942292, date: "2021-01-15" },
  { bytes: 29870234184, date: "2021-01-16" },
  { bytes: 27230618308, date: "2021-01-17" },
  { bytes: 27156995065, date: "2021-01-18" },
  { bytes: 29221600801, date: "2021-01-19" },
  { bytes: 36198621530, date: "2021-01-20" },
  { bytes: 32544766400, date: "2021-01-21" },
  { bytes: 27766560219, date: "2021-01-22" },
  { bytes: 22770835050, date: "2021-01-23" },
  { bytes: 23143317169, date: "2021-01-24" },
  { bytes: 24900144214, date: "2021-01-25" },
  { bytes: 28148458908, date: "2021-01-26" },
  { bytes: 33201385057, date: "2021-01-27" },
  { bytes: 26724503400, date: "2021-01-28" },
  { bytes: 26125736838, date: "2021-01-29" },
  { bytes: 24391042724, date: "2021-01-30" },
  { bytes: 24854148376, date: "2021-01-31" },
  { bytes: 25725968247, date: "2021-02-01" },
  { bytes: 29739185045, date: "2021-02-02" },
  { bytes: 27908487958, date: "2021-02-03" },
  { bytes: 26546192979, date: "2021-02-04" },
  { bytes: 26286256691, date: "2021-02-05" },
  { bytes: 25768456205, date: "2021-02-06" },
  { bytes: 28105735145, date: "2021-02-07" },
  { bytes: 27663605234, date: "2021-02-08" },
  { bytes: 33258289289, date: "2021-02-09" },
  { bytes: 28194578030, date: "2021-02-10" },
  { bytes: 26297600536, date: "2021-02-11" },
  { bytes: 26156071965, date: "2021-02-12" },
  { bytes: 18156402683, date: "2021-02-13" },
  { bytes: 18677356172, date: "2021-02-14" },
  { bytes: 18179779733, date: "2021-02-15" },
  { bytes: 19822861786, date: "2021-02-16" },
  { bytes: 20600289588, date: "2021-02-17" },
  { bytes: 22508670135, date: "2021-02-18" },
  { bytes: 18479832607, date: "2021-02-19" },
  { bytes: 16043269728, date: "2021-02-20" },
  { bytes: 16465203373, date: "2021-02-21" },
  { bytes: 18059639128, date: "2021-02-22" },
  { bytes: 20306468773, date: "2021-02-23" },
  { bytes: 21242962827, date: "2021-02-24" },
  { bytes: 19214226560, date: "2021-02-25" },
  { bytes: 19998851204, date: "2021-02-26" },
  { bytes: 22102444782, date: "2021-02-27" },
  { bytes: 18450189749, date: "2021-02-28" },
  { bytes: 19821616596, date: "2021-03-01" },
  { bytes: 11852677536, date: "2021-03-02" },
  { bytes: 0, date: "2021-03-03" }
];

type TooltipData = {
  entry: RecordVolumeEntry;
};

export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

const blue = "hsla(200,67%,50%,1)";
const gray = "#9e9e9e";
export const background = "rgb(46, 46, 46)";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
};

const recordVolumeMax = recordVolumeData.reduce(
  (subtotal, entry) => Math.max(subtotal, entry.bytes),
  0
);

const datesSet = recordVolumeData.reduce((memo, entry) => {
  memo.add(entry.date);
  return memo;
}, new Set<string>());

const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
const formatDate = (date: string) => format(parseDate(date));

// accessors
const getDate = (d: RecordVolumeEntry) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: recordVolumeData.map(getDate),
  padding: 0.2
});
const volumeScale = scaleLinear<number>({
  domain: [0, recordVolumeMax],
  nice: true
});

let tooltipTimeout: number;

export default function Example({
  width,
  height,
  events = false,
  margin = defaultMargin
}: BarStackProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true
  });

  if (width < 10) return null;
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  dateScale.rangeRound([0, xMax]);
  volumeScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={volumeScale}
          width={xMax}
          height={yMax}
          stroke={gray}
          strokeDasharray="1 1"
          strokeOpacity={0.1}
          xOffset={dateScale.bandwidth() / 2}
        />
        <Group top={margin.top}>
          {recordVolumeData.map((entry) => {
            const barWidth = dateScale.bandwidth();
            const barHeight = yMax - volumeScale(entry.bytes);
            const barX = dateScale(entry.date);
            const barY = yMax - barHeight;
            return (
              <Bar
                key={`bar-${entry.date}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={blue}
                onClick={() => {
                  if (events) alert(`clicked: ${JSON.stringify(entry)}`);
                }}
                onMouseMove={(event) => {
                  const coords = localPoint(event);
                  showTooltip({
                    tooltipData: { entry },
                    tooltipTop: coords.y,
                    tooltipLeft: barX + barWidth / 2
                  });
                }}
              />
            );
          })}
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={dateScale}
          tickFormat={formatDate}
          stroke={gray}
          tickStroke={gray}
          tickLabelProps={() => ({
            fill: gray,
            fontSize: 11,
            textAnchor: "middle"
          })}
        />
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: blue }}>
            <strong>Record volume</strong>
          </div>
          <div>{tooltipData.entry.bytes}</div>
          <div>
            <small>{formatDate(getDate(tooltipData.entry))}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}

export default function BarChart() {

    return (
        <div style={{ height: '500px', width: '500px' }}> 
        <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>
        </div>
    )
} 