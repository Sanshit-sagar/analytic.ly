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

  return (
    <svg height={height} width={width} fill={'transparent'}>
      <rect height={height} width={width} rx={15} ry={15}>
        <XYChart
          margin={{ top: 15, right: 25, bottom: 40, left: 35 }}
          width={width}
          height={height}
          xScale={{ type: "band", paddingInner: 0.5 }}
          yScale={{ type: "linear" }}
          theme={theme}
        >
          <TimeseriesBackground />
          <AnimatedGrid numTicks={3} columns={true} />
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
                  <div style={{ backgroundColor: 'white', fontStyle: 'light', padding: '5px', borderRadius: '3.5px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}>
                    <p> Key: {td.key} </p>
                    <p> Interval # {xAccessor(td)} </p>
                    <p> {yAccessor(td)} Clicks </p>
                  </div>
              );
            }}
          />
        </XYChart>  
      </rect>
    </svg>
  );
};

const HEIGHT = 375;
const WIDTH = 750; 
// const DEFAULT_MARGIN = { top: 50, left: 50, right: 50, bottom: 50 }; 

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
     
        <Box style={{ height: '450px', width: '1000px', display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', alignItems: 'stretch' }}>
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
              
            <Button onClick={() => toggleTheme()}>
             <Text size='1'>  Toggle </Text>
            </Button>

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

