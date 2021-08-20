import React, { useState } from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
  lightTheme,
  darkTheme,
} from "@visx/xychart";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { useClickHistoryForUser} from "../../hooks/useClicks";
import TimeseriesBackground from './Background'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'

import SelectionMenu from '../RangeSelector'

type Key = "click" | "unique";
type Datum = { 
  x: string, 
  y: number,
  key: Key, 
};

interface ChartProps {
  width?: number;
  height?: number;
  theme?: any;
  xAccessor?: (d: Datum) => string;
  yAccessor?: (d: Datum) => number; 
}

const emptyDatum: Datum = {
  x: `${new Date().getMonth()}/${new Date().getDate()}`,
  y: 0,
  key: "click"
}

const Chart = ({ 
  width = 500, 
  height = 250, 
  theme, 
  xAccessor = (d: Datum) => d.x,
  yAccessor = (d: Datum) => d.y,
}: ChartProps) => {

  const { clicks, loading, error } = useClickHistoryForUser();

  if(loading) return <p>loading...</p> 
  if(error) return <p> error! </p>
  if(!clicks?.length) return <p>no data! </p> 

  const dataA: Datum[] = new Array(clicks.length).fill(null).map((_, i) => ({
    key: 'click',
    x: clicks[i].x,
    y: clicks[i].y
  }));

  const BACKGROUND = '#f3f3f3'
  const margin = { top: 20, left: 50, bottom: 30, right: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return (
      <svg width={width} height={height}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill={BACKGROUND}
        />
        <XYChart
          margin={{ top: 15, right: 25, bottom: 40, left: 35 }}
          width={width}
          height={height}
          xScale={{ type: "band", paddingInner: 0.5 }}
          yScale={{ type: "linear" }}
          theme={theme}
        >
        <TimeseriesBackground />
        <AnimatedGrid 
          numTicks={3} 
          columns={true} 
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
          orientation="bottom" 
          numTicks={10} 
        />
        <Tooltip<Datum>
          showVerticalCrosshair
          snapTooltipToDatumX
          renderTooltip={({ tooltipData }) => {
            const td = tooltipData?.nearestDatum?.datum || emptyDatum

            return (
                <Box css={{ padding: '$1 $2', br: '$1', border: 'thin solid black', bc: 'white' }}>
                  <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                    <Text> Key: {td.key} </Text>
                    <Text> Interval # {xAccessor(td)} </Text>
                    <Text> {yAccessor(td)} Clicks </Text>
                  </Flex>
                </Box>
            );
          }}
        />
      </XYChart>  
    </svg>
  );
};

const HEIGHT = 375;
const WIDTH = 750;  

const Timeseries = () => {
  const [theme, setTheme] = useState(lightTheme)
  const [themeName, setThemeName] = useState('light')

  const toggleTheme = () => {
    if(themeName==='light') {
      setTheme(darkTheme)
      setThemeName('dark')
    } else {
      setTheme(lightTheme)
      setThemeName('light')
    }
  }

  return (
     
        <Box style={{ height: '400px', width: '800px', display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', alignItems: 'stretch', border: 'thin solid black', br: '$1' }}>
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
            <Button onClick={() => toggleTheme()}> 
              {themeName}
            </Button>

            <SelectionMenu /> 

            <Box css={{ height: HEIGHT, width: WIDTH }} >
              <ParentSize>
                {({ width, height }) => {
                  return (
                    <Chart 
                      width={width} 
                      height={height}
                      theme={theme}
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

