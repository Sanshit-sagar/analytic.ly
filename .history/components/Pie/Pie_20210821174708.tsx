import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";

import { VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import AnimatedPie from './AnimatedPie'

interface ArcWrapper {
  data: Datum;
}

interface Datum {
  title: string;
  score: string;
  rank: string;
};

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: { top: number, left: number, right: number, bottom: number }; 
  animate: boolean;
};

const Chart = ({
  freqs,
  width,
  height,
  margin,
  animate = true
}: PieProps) => {

  const [selected, setSelected] = useState('');
  const features: Datum[] = freqs && freqs?.length > 1 ? freqs.slice(0, 5) : (freqs || []);

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
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

  const BACKGROUND = 'rgba(50,50,50,1.0)'

  const colorScale = scaleOrdinal({
    domain: freqs.map((freq: Datum, _: number) => freq.score),
    range: [
      'rgba(0,255,165,1.0)',
      'rgba(0,255,165,0.8)',
      'rgba(0,255,165,0.6)',
      'rgba(0,255,165,0.4)',
      'rgba(0,255,165,0.2)',
      'rgba(0,255,200,1.0)',
    ]
  });

  return (
    
      <svg width={width} height={height}>
        <rect
          rx={14}
          width={width}
          height={height}
          fill={BACKGROUND}
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
              getKey={(arc: ArcWrapper) => `${name(arc.data)}`}
              onClickDatum={(arc: ArcWrapper) =>
                setSelected(selected && selected===name(arc.data) ? '' : name(arc.data))
              }
              getColor={(arc: ArcWrapper) => colorScale(name(arc.data))}
            />
          )}
        </Pie>
      </Group>
    </svg>
  );
}

interface FreqPieChartProps {
  freqs: number[];
  animate:boolean;
  margin: any;
}

const FreqPieChart = ({ freqs, animate, margin }: FreqPieChartProps) => {

  return (
    <VisxParentSizeWrapper>
      <ParentSize>
        {({ width, height }) => {
          return (
            <Chart
              freqs={freqs}
              width={width} 
              height={height} 
              animate={animate}
              margin={margin}
            />
          );
        }}
      </ParentSize>
    </VisxParentSizeWrapper>
  )
}

export default FreqPieChart

