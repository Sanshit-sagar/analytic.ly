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
import { ThemeConfig } from '@visx/xychart/lib/theme/buildChartTheme'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { useClickHistoryForUser} from "../../hooks/useClicks";
import TimeseriesBackground, { customTheme } from './Background'
import { MovingWaves } from './Background'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { format } from '../../lib/utils/d3time'

const DEFAULT_MARGIN = { top: 25, right: 25, bottom: 50, left: 50 };
type Key = "click" | "unique";
type Datum = { 
  x: string;
  y: number | any;
  key: Key;
  leftBound: number;
  rightBound: number;
};

interface ChartProps {
  width?: number;
  height?: number;
  theme?: any;
  amount: string;
  range: string;
  interval: string;  
}

const emptyDatum: Datum = {
  x: `${new Date().getMonth()}/${new Date().getDate()}`,
  y: 0,
  key: "click",
  leftBound: 12124343,
  rightBound: 12314123
}

const Chart = ({ 
  width = 500, 
  height = 250, 
  theme=lt, 
  amount,
  range,
  interval,
  margin=DEFAULT_MARGIN
}: ChartProps) => {

  const { clicks, bounds, minTimestamp, maxTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

  if(loading) return <p>loading...</p> 
  if(error) return <p> error! </p>
  if(!clicks?.length) return <p>no data! </p> 

  const xAccessor: (d: Datum) => string = (d: Datum) => d.x
  const yAccessor: (d: Datum) => number = (d: Datum) => d.y

  function parseTimestamp(x0: number | string | any) {
      if(interval==='sec') {
        x0 += 60 * minTimestamp; 
    } else if(interval==='min') {
        x0 += 1000 * 60 * minTimestamp; 
    } else if(interval==='hour') {
        x0 += 1000 * 60 * 60 * minTimestamp;
    } else {
        x0 += minTimestamp * 60 * 60 * 1000 * 24; 
    }
    return format(new Date(x0), 'dayhour');
  }

  const dataA: Datum[] = new Array(clicks.length).fill(null).map((_, i) => ({
    key: 'click',
    x: clicks[i].x,
    y: clicks[i].y,
    leftBound: minTimestamp,
    rightBound: maxTimestamp,
    timestamp: format(new Date(parseInt(`${minTimestamp}`) + clicks[i].x), 'dayhourmin'),
  }));

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

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
        <p> HIHI {JSON.stringify(bounds)} </p>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill={"url(#waves)"}
        />
        <XYChart
          margin={DEFAULT_MARGIN}
          width={width}
          height={height}
          xScale={{ type: "band", paddingInner: 0 }}
          yScale={{ type: "linear" }}
          theme={darkTheme}
        >
        <TimeseriesBackground />
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
          numTicks={3} 
        /> 
        <AnimatedAxis 
          orientation="bottom" 
          numTicks={2}  
          tickValues={clicks.map((click: any, i: number) => {
            let rem = clicks[i].x % 60; 
            if(rem===10 || rem===20 || rem===40 || rem===50) {
              return parseInt(`${click.x}`);
            }
          })}
          tickFormat={(x: number, _: number) => {
            let x0: number = minTimestamp;
            return x0;  
          }}
        />
        <Tooltip<Datum>
          showVerticalCrosshair
          snapTooltipToDatumX
          renderTooltip={({ tooltipData }) => {
            const td = tooltipData?.nearestDatum?.datum || emptyDatum

            return (
                <Box css={{ padding: '$1 $1', br: '$1', border: 'thin solid black', bc: 'white' }}>
                  <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                    <Text> Key: {td.key} </Text>
                    <Text> Interval # {xAccessor(td)} </Text>
                    <Text> {yAccessor(td)} Clicks </Text>
                    <Text> {td.timestamp} </Text> 
                  </Flex>
                </Box>
            );
          }}
        />
      </XYChart>  
    </svg>
  );
};




const Timeseries = ({ amount, range, interval, darkMode, updateAmount, updateRange, updateInterval, toggleDarkMode }: RangeInfo) => {
  
  return (
    <Box css={{ height: '550px', width: '650px', mt: '$1', mb: '$1', ml: '$2', pl: '$2', display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', alignItems: 'stretch' }}>
      <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
        
        {/* <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>
          <Text> User: sanshit.sagar@gmail.com </Text>
        </Flex> */}

        <Box css={{ height: '415px', width: '675px' }}>
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
                /> 
              ); 
            }}
          </ParentSize>
        </Box>         
      </Flex>
    </Box>
  )
}

export default Timeseries;

