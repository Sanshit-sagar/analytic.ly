import React, { useContext } from 'react';
import { PatternLines } from '@visx/pattern';
import { DataContext } from '@visx/xychart';
import { buildChartTheme } from '@visx/xychart'

const patternId = 'xy-chart-pattern';

export const customTheme =  buildChartTheme({
  backgroundColor: '#f09ae9',
  colors: ['rgba(255,231,143,0.8)', '#6a097d', '#d6e0f0'],
  gridColor: '#336d88',
  gridColorDark: '#1d1b38',
  svgLabelBig: { fill: '#1d1b38' },
  tickLength: 8,
});

function TimeseriesBackground() {
  const { theme, margin, width, height, innerWidth, innerHeight } = useContext(DataContext);

  if (width == null || height == null || margin == null || theme == null) return null;

  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
        orientation={['diagonal']}
        stroke={theme?.gridStyles?.stroke}
        strokeWidth={1}
      />
      <rect x={0} y={0} width={width} height={height} fill={theme?.backgroundColor ?? '#fff'} />
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.3}
      />
    </>
  );
}

export default TimeseriesBackground
