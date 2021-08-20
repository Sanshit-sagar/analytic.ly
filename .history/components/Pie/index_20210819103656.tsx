import React, { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { letterFrequency } from "@visx/mock-data";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { useFrequencies } from '../../hooks/useClicks'


const getLetterFrequencyColor = scaleOrdinal({
  domain: letters.map((l) => l.letter),
  range: [
    "rgba(93,30,91,1)",
    "rgba(93,30,91,0.8)",
    "rgba(93,30,91,0.6)",
    "rgba(93,30,91,0.4)"
  ]
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

interface Datum {
  title: string;
  score: string;
  rank: string;
}

export type PieProps = {
  freqs: Datum;
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

interface ArcDatum {
  feature: string;
}

function PieChart({
  freqs,
  width,
  height,
  margin = defaultMargin
}: PieProps) {

  const features: Datum[] = freqs && freqs?.length > 1 ? freqs.slice(0, 4) : (freqs || []);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;

  const name: (d: Datum) => string = (d: Datum) => d.title; 
  const frequency: (d: Datum) => number = (d: Datum) => d.score;
  const rank: (d: Datum) => number = (d: Datum) => d.rank;

  const pieSortValues: (n1: number, n2: number) => number = (nA: number, nB: number) => {
    return parseInt(`${nB}`) - parseInt(`${nA}`);
  }

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie
          data={features}
          pieValue={frequency}
          pieSortValues={pieSortValues}
          outerRadius={radius}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const dtm: Datum = arc.data;
              const t: string = name(dtm);
              const f: number = frequency(dtm);
              const r: number = rank(dtm);

              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc) || undefined
              const arcFill = getLetterFrequencyColor(frequency);

              return (
                <g key={`arc-${t}-${index}`}>
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
                      {t}: {f}
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
  const [filter, setFilter] = useState('browser')
  const { freqs, loading, error } = useFrequencies(filter)

  if(loading) return <p> loading...</p>
  if(error) return <p> error </p>

  return (
    <Box css={{ height: '500px', width: '500px' }}> 
      <ParentSize>
        {({ width, height }) => {
          return (
            <PieChart 
              freqs={freqs}
              width={width} 
              height={height} 
            />
          )
        }}
      </ParentSize>
    </Box>
  )
}

export default PieChart