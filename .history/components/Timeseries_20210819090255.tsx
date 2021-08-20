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
import { useClickHistoryForUser} from "../hooks/useClicks";
import CustomChartBackground from './CustomChartBackground'

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
    <rect height={height} width={width} rx={15} ry={15}>
      <XYChart
        margin={{ top: 15, right: 25, bottom: 40, left: 35 }}
        width={width}
        height={height}
        xScale={{ type: "band", paddingInner: 0.5 }}
        yScale={{ type: "linear" }}
        theme={theme}
      >
        <CustomChartBackground />
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
          renderTooltip={({ tooltipData, colorScale }) => {
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
  );
};

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
      <>
        <div style={{ height: '600px', width: '1000px', display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', alignItems: 'stretch' }}>
          <button
            key='theme_toggler'
            onClick={() => toggleTheme()}
            style={{ 
                backgroundColor: 'white', border: 'thin solid black', borderRadius: '5px',
                color: 'black', fontSize: '14px', height: '40px', width: '32.5px',
                margin: '5px', marginBottom: '2px', padding: '5px 10px'
            }}
          >
            Toggle
          </button>

          <div style={{ height: '500px', width: '800px'}}>
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
          </div>
        </div>
      </>
  )
}

export default Timeseries;

