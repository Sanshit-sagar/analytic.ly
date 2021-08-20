import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";

import AnimatedPie from './AnimatedPie'

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

interface ArcProps {
  startAngle: any;
  endAngle: any;
}

interface Datum {
  title: string;
  score: string;
  rank: string;
}

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: typeof defaultMargin;
  animate: boolean;
  updateFilter: any; 
};

function FreqPieChart({
  freqs,
  width,
  height,
  margin = defaultMargin,
  animate = true,
  updateFilter,
}: PieProps) {
  const [selected, setSelected] = useState('');
  const features: Datum[] = freqs && freqs?.length > 1 ? freqs.slice(0, 4) : (freqs || []);
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  const name: (d: Datum) => string = (d: Datum) => d.title; 
  const frequency: (d: Datum) => number = (d: Datum) => parseInt(`${d.score}`);
  const rank: (d: Datum) => number = (d: Datum) => parseInt(`${d.rank}`)

  const colorScale = scaleOrdinal({
    domain: freqs.map((freq: Datum, _: number) => freq.score),
    range: [
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,0.6)',
      'rgba(255,255,255,0.5)',
      'rgba(255,255,255,0.4)',
      'rgba(255,255,255,0.3)',
      'rgba(255,255,255,0.2)',
      'rgba(255,255,255,0.1)',
    ]
  });

  const pieSortValues: (n1: number, n2: number) => number = (nA: number, nB: number) => {
    return parseInt(`${nB}`) - parseInt(`${nA}`);
  }

  return (
      <svg width={width} height={height}>
        <LinearGradient from='green' to='violet' id={`gradientFill`} />
        <rect
          rx={14}
          width={width}
          height={height}
          fill="url('#gradientFill')"
        />
        <Group 
          top={centerY + margin.top} 
          left={centerX + margin.left}
        >
        <Pie
          data={features}
          pieValue={frequency}
          pieSortValues={pieSortValues}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => (
            <AnimatedPie
              {...pie}
              height={height} 
              width={width}
              animate={animate}
              getKey={(arc: IDatum) => `${name(arc.data)}`}
              onClickDatum={({ data: { label } }) =>
                setSelected(selected && selected===label ? null : label)
              }
              getColor={(arc: IDatum) => colorScale(name(arc.data))}
            />
          )}
          
        </Pie>
      </Group>
    </svg>
  );
}

export default FreqPieChart

