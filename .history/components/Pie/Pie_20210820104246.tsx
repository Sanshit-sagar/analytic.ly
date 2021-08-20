import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";

import AnimatedPie from './AnimatedPie'

const defaultMargin = { top: 50, left: 150, bottom: 50, right: 20 };

interface Datum {
  title: string;
  score: string;
  rank: string;
};

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: typeof defaultMargin;
  animate: boolean;
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

  const innerWidth = 0.75*(width - margin.left - margin.right)
  const innerHeight = 0.75*(height - margin.top - margin.bottom)
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  let totalFreqs = 0;
  let feats: number[] = []; 
  features.map((feat: Datum, _: number) => {
    totalFreqs += parseInt(feat.score)
    feats.push(parseInt(feat.score))
  });
  const name: (d: Datum) => string = (d: Datum) => d.title; 
  const rank: (d: Datum) => number = (d: Datum) => parseInt(`${d.rank}`)
  const frequency: (d: Datum) => number = (d: Datum) => (parseInt(`${d.score}`)/totalFreqs)*100;
  const frequencyStr: (d: Datum) => string = (d: Datum) => `${(parseInt(`${d.score}`)/totalFreqs)*100}`;
  const pieSortValues: (n1: number, n2: number) => number = (nA: number, nB: number) => parseInt(`${nB}`) - parseInt(`${nA}`)

  const colorScale = scaleOrdinal({
    domain: freqs.map((freq: Datum, _: number) => freq.score),
    range: [
      'rgba(0,1,100,0.7)',
      'rgba(50,10,255,0.5)',
      'rgba(50,10,255,0.3)',
      'rgba(50,10,255,0.1)',
    ]
  });

  return (
      <svg width={width} height={height}>
        <rect
          rx={14}
          width={width}
          height={height}
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
              feats={feats}
              frequencyStr={frequencyStr}
              height={height} 
              width={width}
              rank={rank}
              animate={animate}
              getKey={(arc: Datum) => `${name(arc.data)}`}
              onClickDatum={(arc: Datum) =>
                setSelected(selected && selected===name(arc.data) ? '' : name(arc.data))
              }
              getColor={(arc: Datum) => colorScale(name(arc.data))}
            />
          )}
        </Pie>
      </Group>
    </svg>
  );
}

export default FreqPieChart

