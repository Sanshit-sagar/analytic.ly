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

import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { ThemeConfig } from '@visx/xychart/lib/theme/buildChartTheme'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useAtom } from 'jotai'
import { darkModeAtom } from '../../pages/index'

import { format } from '../../lib/utils/d3time'
import { useClickHistoryForUser} from '../../hooks/useClicks'

const DEFAULT_MARGIN = { top: 20, right: 5, bottom: 30, left: 30 };
type Key = "click" | "unique";

export interface IMarginProps {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

type Datum = { 
  key: Key;
  x: string;
  y: number | any;
  timestamp: string;
};

interface ChartProps {
  width?: number;
  height?: number;
  theme?: any;
  data: any[];
  minTimestamp: number,
  interval: string,
  background: string,
  margin?: IMarginProps;
}

export interface TimeseriesProps {
    interval: string;
    range: string;
    amount: number;
}

const emptyDatum: Datum = {
  x: `${new Date().getMonth()}/${new Date().getDate()}`,
  y: 0,
  key: "click",
  timestamp: '12345678000',
}

function formatClickDate(x: number, minTimestamp: number, interval: string): string {
    let x0: number = minTimestamp;
    
    if(interval==='sec') {
        x0 += 1000 * x; 
    } else if(interval==='min') {
        x0 += 60 * 1000 * x; 
    } else if(interval==='hour') {
        x0 += 60 * 60 * 1000 * x;
    } else {
        x0 += 24 * 60 * 60 * 1000 * x; 
    }

    return format(new Date(x0), 'dayhourmin') || `${new Date(x0).toLocaleDateString()}`;
}

const Chart = ({ 
  width = 500, 
  height = 250, 
  theme,
  data,
  minTimestamp,
  interval,
  background,
  margin
}: ChartProps) => {
  const xAccessor: (d: Datum) => string = (d: Datum) => d.x
  const yAccessor: (d: Datum) => number = (d: Datum) => d.y

  return (
      <svg width={width} height={height}>
        <rect 
          x={0} 
          y={0} 
          width={width} 
          height={height} 
          fill={background} 
          rx={5} 
        />
        <XYChart
          margin={DEFAULT_MARGIN}
          width={width}
          height={height}
          xScale={{ type: "band", paddingInner: 0 }}
          yScale={{ type: "linear" }}
          theme={theme}
        >
        <AnimatedGrid 
          stroke={'#fff'}
          strokeDasharray="5 10"
          strokeOpacity={0.25}
          animationTrajectory={'center'}
        />
        <AnimatedLineSeries
          dataKey="Clicks"
          data={data}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />
        <AnimatedAxis 
          orientation="left" 
          hideTicks
          hideAxisLine
          tickFormat={(t: number, _:number) => t%1===0 ? `${t}` : ''}
          tickLabelProps={() => ({
              fontSize: 12,
              fontStyle: "light",
              fontWeight: 200,
              lineHeight: 19,
              textTransform: "uppercase",
              fill: '#fff'
          })}
        /> 
        <AnimatedAxis 
          orientation="bottom" 
          numTicks={2}  
          hideTicks
          stroke={'transparent'}
          labelOffset={10}
          tickLabelProps={() => ({
            fill: '#fff',
            fontSize: 10,
            fontStyle: "light",
            textAnchor: 'end',
            lineHeight: 10,
            textTransform: "lowercase",
            opacity: 1.0,
          })}
          tickValues={data.map((_: any, i: number) => data[i].x).filter((cx: any, _: number) => parseInt(`${cx}`)%(data.length/4)===0)}
          tickFormat={(x: number, _: number) => formatClickDate(x, minTimestamp, interval)}
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

const darkTheme = buildChartTheme(({
    ...dt,
    colors: ['#33ffaa', '#109CF1', '#a12' ],
    background:  'rgba(50,50,50,1.0)'
} as unknown) as ThemeConfig); 
    
  const lightTheme = buildChartTheme(({
    ...lt,
    colors: ['#109CF1'],
    background:  'rgba(255,255,255,1.0)'
} as unknown) as ThemeConfig);

const XYGraph = ({ amount, range, interval }: TimeseriesProps) => {
    const [darkMode] = useAtom(darkModeAtom);

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

    if(loading) return <p> loading... </p>  
    if(error) return <p> error! </p>

    const dataA: Datum[] = new Array(clicks.length).fill(null).map((_, i) => ({
        key: 'click',
        x: clicks[i].x,
        y: clicks[i].y,
        timestamp: formatClickDate(clicks[i].x, minTimestamp, interval),
    }));

    const BACKGROUND = !darkMode ? "rgba(50,50,50, 1.0)" : 'rgba(255,255,255,1.0)'

    return (
        <>
            <ParentSize> 
                {({ width, height }) => {
                    return (
                        <Chart 
                            width={width} 
                            height={height}
                            theme={!darkMode ? darkTheme : lightTheme}
                            data={dataA}
                            minTimestamp={minTimestamp}
                            interval={interval}
                            background={BACKGROUND}
                            margin={DEFAULT_MARGIN}
                        /> 
                    ); 
                }}
            </ParentSize> 
        </> 
    )
}

export default XYGraph;
