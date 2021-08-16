import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  BarSeries,
  buildChartTheme,
  DataContext,
  Tooltip,
  TooltipContext,
  TooltipProvider,
  TooltipContextType,
  XYChart
} from "@visx/xychart";

type Datum = { x: string; y: number };

const data: Datum[] = new Array(31).fill(null).map((_, i) => ({
  x: `2020-01-${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
  y: 100 * Math.random() * i + 50
}));

const customTheme = buildChartTheme({
  backgroundColor: "#f05454",
  colors: ["#30475e"],
  gridColor: "#e8e8e8",
  gridColorDark: "#222831",
  svgLabelSmall: { fill: "#e8e8e8" },
  svgLabelBig: { fill: "#e8e8e8" },
  tickLength: 4
});

const ChartBackground = () => {
  const { theme, width, height } = useContext(DataContext);
  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill={theme?.backgroundColor ?? "#fff"}
    />
  );
};

const Chart = ({
  width,
  height,
  dataKey = "line",
  xAccessor = (d: Datum) => d.x,
  yAccessor = (d: Datum) => d.y
}) => {
  const [tooltipDataIndex, setTooltipDataIndex] = useState(3);
  const { showTooltip, hideTooltip } = useContext(
    TooltipContext
  ) as TooltipContextType<Datum>;

  const triggerTooltip = useCallback(
    (index?: number) => {
      const dataIndex = typeof index === "number" ? index : tooltipDataIndex;
      if (showTooltip)
        showTooltip({
          index: dataIndex,
          svgPoint: { y: 50 }, // offset 50 from chart top
          datum: data[dataIndex],
          key: dataKey
        });
    },
    [dataKey, showTooltip, tooltipDataIndex]
  );

  // trigger on first mount (empty dep array)
  useEffect(() => triggerTooltip(), []);

  return (
    <>
      <XYChart
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        width={width}
        height={height / 3}
        xScale={{ type: "band", paddingInner: 0.5 }}
        yScale={{ type: "linear" }}
        theme={customTheme}
      >
        <ChartBackground />
        <AnimatedGrid numTicks={3} columns={false} />
        <BarSeries
          dataKey={dataKey}
          data={data}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          onFocus={() => console.log("Tab-able tooltips")}
        />
        <AnimatedAxis orientation="bottom" numTicks={3} />
        <Tooltip<Datum>
          showVerticalCrosshair
          snapTooltipToDatumX
          renderTooltip={({ tooltipData, colorScale }) => (
            <>
              <div style={{ color: colorScale(dataKey) }}>{dataKey}</div>
              <br />
              {xAccessor(tooltipData.datumByKey[dataKey].datum)}:{" "}
              {yAccessor(tooltipData.datumByKey[dataKey].datum).toFixed(2)}
            </>
          )}
        />
      </XYChart>
      <button onPointerUp={() => triggerTooltip()}>Trigger tooltip</button>{" "}
      <button onPointerUp={hideTooltip}>Hide tooltip</button> <br />
      Data index {tooltipDataIndex}{" "}
      <input
        type="range"
        min={0}
        max={data.length - 1}
        value={`${tooltipDataIndex}`}
        onChange={(e) => {
          const nextIndex = Number(e.target.value);
          triggerTooltip(nextIndex);
          setTooltipDataIndex(nextIndex);
        }}
      />
      <br />✨ Also try keyboard tabbing for onFocus-triggered tooltips
    </>
  );
};

export default ({ width, height }) => (
  <TooltipProvider hideTooltipDebounceMs={0}>
    <Chart width={width} height={height} />
  </TooltipProvider>
);
