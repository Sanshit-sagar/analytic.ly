import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";

import { Text } from '../../primitives/Text'

import AnimatedPie from './AnimatedPie'

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

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
  animate = true
}: PieProps) {

  const [selected, setSelected] = useState('');
  const features: Datum[] = freqs && freqs?.length > 1 ? freqs.slice(0, 5) : (freqs || []);
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  let totalFreqs = 0;
  features.map((feat: Datum, _: number) => totalFreqs += parseInt(feat.score));
  const name: (d: Datum) => string = (d: Datum) => d.title; 
  const rank: (d: Datum) => number = (d: Datum) => parseInt(`${d.rank}`)
  const frequency: (d: Datum) => number = (d: Datum) => (parseInt(`${d.score}`)/totalFreqs)*100;
  const pieSortValues: (n1: number, n2: number) => number = (nA: number, nB: number) => parseInt(`${nB}`) - parseInt(`${nA}`)

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
              getKey={(arc: Datum) => `${name(arc.data)}`}
              onClickDatum={({ data: { label } }) =>
                setSelected(selected && selected===label ? null : label)
              }
              getColor={(arc: Datum) => colorScale(name(arc.data))}
            />
          )}
        </Pie>
         <Text> HIHIHIHIHIH </Text>
      </Group>
    </svg>
  );
}

export default FreqPieChart

