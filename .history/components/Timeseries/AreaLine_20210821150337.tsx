import React from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
  lightTheme as lt,
  darkTheme as dt,
  buildChartTheme
} from "@visx/xychart";

import TimeseriesBackground from './Background'
import { useClickHistoryForUser} from '../../hooks/useClicks'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { ThemeConfig } from '@visx/xychart/lib/theme/buildChartTheme'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { VisxParentSizeWrapper } from '../../primitives/Shared'
import { format } from '../../lib/utils/d3time'

const DEFAULT_MARGIN = { top: 25, right: 50, bottom: 32.5, left: 35 };
type Key = "click" | "unique";

interface IMarginProps {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

// interface ITimeseriesProps {
//   amount: number;
//   range: number;
//   interval: string;
//   darkMode: boolean; 
//   updateAmount: any;
//   updateRange: any;
//   updateInterval: any;
//   toggeDarkMode: any; 
// }

type Datum = { 
  key: Key;
  x: string;
  y: number | any;
  timestamp: number;
};

interface ChartProps {
  width?: number;
  height?: number;
  theme?: any;
  amount: string;
  range: string;
  interval: string;  
  margin: IMarginProps;
  darkMode: boolean;
  toggleDarkMode: any;
}

const emptyDatum: Datum = {
  x: `${new Date().getMonth()}/${new Date().getDate()}`,
  y: 0,
  key: "click",
  timestamp: 12345678000,
}

function formatClickDate(x: number, mints: number, interval: string) {
    let x0: number = mints;
    
    if(interval==='sec') {
        x0 += 1000 * x; 
    } else if(interval==='min') {
        x0 += 60 * 1000 * x; 
    } else if(interval==='hour') {
        x0 += 60 * 60 * 1000 * x;
    } else {
        x0 += 24 * 60 * 60 * 1000 * x; 
    }

    return format(new Date(x0), 'dayhourmin');
}

const Chart = ({ 
  width = 500, 
  height = 250, 
  theme, 
  amount,
  range,
  interval,
  margin=DEFAULT_MARGIN,
  darkMode,
  toggleDarkMode
}: ChartProps) => {

  const { clicks, bounds, minTimestamp, maxTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

  if(loading) return <p>loading...</p> 
  if(error) return <p> error! </p>
  if(!clicks?.length) return <p>no data! </p> 

  const xAccessor: (d: Datum) => string = (d: Datum) => d.x
  const yAccessor: (d: Datum) => number = (d: Datum) => d.y

  const dataA: Datum[] = new Array(clicks.length).fill(null).map((_, i) => ({
    key: 'click',
    x: clicks[i].x,
    y: clicks[i].y,
    timestamp: formatClickDate(clicks[i].x, minTimestamp, interval),
  }));

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const BACKGROUND = "rgba(50,50,50, 1.0)"

  const darkTheme = buildChartTheme(({
    ...dt,
    colors: ['#33ffaa', '#109CF1', '#a12' ],
  } as unknown) as ThemeConfig)
  
  const lightTheme = buildChartTheme(({
    ...lt,
    colors: ['#109CF1'],
  } as unknown) as ThemeConfig)

  return (
      <svg width={width} height={height}>
        <rect 
          x={0} 
          y={0} 
          width={innerWidth} 
          height={innerHeight} 
          fill={BACKGROUND} 
          rx={2} 
        />
        <XYChart
          margin={DEFAULT_MARGIN}
          width={width}
          height={height}
          xScale={{ type: "band", paddingInner: 0 }}
          yScale={{ type: "linear" }}
          theme={darkMode ? lightTheme : darkTheme}
        >
        <AnimatedGrid 
          numTicks={4} 
          columns={true}
          rows={true} 
          animationTrajectory={'center'}
        />
        {!loading && !error && clicks &&
          <AnimatedLineSeries
            dataKey="Clicks"
            data={dataA}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
          />
        }
        <AnimatedAxis 
          orientation="left" 
          numTicks={4}
          tickValues={clicks.map((click: any, _:number) => click.y).filter((y: number, _: number) => Math.max(parseInt(`${y}`), (1/parseInt(`${y}`))) === y)}
        /> 
        <AnimatedAxis 
          orientation="bottom" 
          numTicks={2}  
          tickValues={clicks.map((_: any, i: number) => clicks[i].x).filter((cx: any, _: number) => parseInt(`${cx}`)%(clicks.length/4)===0)}
          tickFormat={(x: number, _: number) => {
            let x0: number = minTimestamp;
            x = parseInt(`${x}`);

            if(interval==='sec') {
                x0 += 1000 * x; 
            } else if(interval==='min') {
                x0 += 60 * 1000 * x; 
            } else if(interval==='hour') {
                x0 += 60 * 60 * 1000 * x;
            } else {
                x0 += 24 * 60 * 60 * 1000 * x; 
            }

            return format(new Date(x0), 'dayhour');
          }}
        />
        <Tooltip<Datum>
          showVerticalCrosshair
          snapTooltipToDatumX
          renderTooltip={({ tooltipData }) => {
            const td = tooltipData?.nearestDatum?.datum || emptyDatum

            return (
                <Box css={{ minWidth: '200px', minHeight: '50px', padding: '$1 $1', bc: 'white' }}>
                  <Flex css={{ fd: 'row', jc: 'space-between', ai: '', gap: '$1' }}>                    
                    <Text size='1'> {td.timestamp} </Text> 
                    <Text size='1'> {yAccessor(td)} Clicks </Text>
                  </Flex>
                </Box>
            );
          }}
        />
      </XYChart>  
    </svg>
  );
};

const Timeseries = ({ amount, range, interval, darkMode, updateAmount, updateRange, updateInterval, toggleDarkMode }: ChartProps) => {
  
  return (
      <VisxParentSizeWrapper>
        <ParentSize>
          {({ width, height }) => {
            return (
              <Chart 
                width={width} 
                height={height}
                theme={darkMode ? dt : lt}
                amount={amount}
                range={range}
                interval={interval}
                margin={DEFAULT_MARGIN}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              /> 
            ); 
          }}
        </ParentSize>
      </VisxParentSizeWrapper>
  )
}

export default Timeseries;

