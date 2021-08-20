import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { letterFrequency } from "@visx/mock-data";

import { Box } from '../../primitives/Box'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { LetterFrequency } from "@visx/mock-data/lib/mocks/letterFrequency";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };
interface IPieChartProps {
  height: number;
  width: number; 
  margin?: typeof defaultMargin;
}

const letters = letterFrequency.slice(0, 4);
const frequency = (d) => d.freq;

const getLetterFrequencyColor = scaleOrdinal({
  domain: letters.map((l) => l.letter),
  range: [
    "rgba(93,30,91,1)",
    "rgba(93,30,91,0.8)",
    "rgba(93,30,91,0.6)",
    "rgba(93,30,91,0.4)"
  ]
});

const Example = ({
  width,
  height,
  margin = defaultMargin
}: IPieChartProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a: number, b: number) => b - a;

  return (
    <svg width={width} height={height}>
        <Group top={top} left={left}>
        <Pie
          data={letters}
          pieValue={frequency}
          pieSortValues={pieSortValues}
          outerRadius={radius}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { letter } = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc) || undefined
              const arcFill = getLetterFrequencyColor(letter) 

              return (
                <g key={`arc-${letter}-${index}`}>
                  <path d={arcPath} fill={arcFill} />
                    {hasSpaceForLabel && (
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={22}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {arc.data.letter}
                      </text>
                    )}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}

const PieChart = () => {

  return (
    <Box css={{ height: '350px', width: '350px' }}>
      <ParentSize>
        {({ width, height }) => <Example width={width} height={height} />}
      </ParentSize>,
    </Box> 
  )
}

export default PieChart;