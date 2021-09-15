import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import AnimatedPie from './AnimatedPie'

import { useGloballyConsistentColors } from '../../hooks/useColors'

const BACKGROUND =  'transparent'

interface ArcWrapper {
  data: Datum;
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
  margin: { top: number, left: number, right: number, bottom: number }; 
};

const FreqPieChart = ({
  freqs,
  width,
  height,
  margin
}: PieProps) => {
    const colors = useGloballyConsistentColors();

    const [selected, setSelected] = useState('');
    const features: Datum[] = freqs && freqs?.length > 1 ? freqs.slice(0, 5) : (freqs || []);

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutThickness = 20;

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


    const colorAccessor = (f: Datum) => `${f.title}`;

    const colorScale = scaleOrdinal({
      domain: freqs.map((f: Datum) => colorAccessor(f)),
      range: [ 
          colors.accent, 
          colors.accentHover, 
          colors.accentPressed, 
          colors.funky, 
          colors.funkyText, 
          colors.text 
        ]
    });

  return (
    
    <svg 
        width={width} 
        height={height} 
        fill={'red'}
    >
        <rect
          width={width}
          height={height}
          fill={BACKGROUND}
          rx={14}
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
          cornerRadius={5}
          padAngle={0.005}
        >
             {(pie) => (
                <AnimatedPie
                    {...pie}
                    animate={true}
                    feats={feats}
                    frequencyStr={frequencyStr}
                    height={Math.floor(0.8*height)} 
                    width={width}
                    rank={rank}
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

export default FreqPieChart

