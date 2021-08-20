import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { GradientPinkBlue } from "@visx/gradient";

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
      "rgba(155,30,91,1)",
      "rgba(0,30,255,0.8)",
      "rgba(2,150,10,0.6)",
      "rgba(255,2,255,0.4)"
    ]
  });

  const pieSortValues: (n1: number, n2: number) => number = (nA: number, nB: number) => {
    return parseInt(`${nB}`) - parseInt(`${nA}`);
  }

  const handleAction = () => updateFilter('hihi'); 

  return (
      <svg width={width} height={height}>
        <GradientPinkBlue id="visx-pie-gradient" />
        <rect
          rx={14}
          width={width}
          height={height}
          fill="url('#visx-pie-gradient')"
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
              animate={animate}
              getKey={(arc) => `${name(arc.data)}`}
              onClickDatum={({ data: { label } }) =>
                setSelected(
                  selected && selected===label ? null : label
                )
              }
              getColor={(arc) => colorScale(name(arc.data))}
            />
          )}
          
        </Pie>
      </Group>
    </svg>
  );
}

export default FreqPieChart



// {(pie) => {
//   return pie.arcs.map((arc, _: number) => {
//     const dtm: Datum = arc.data;
//     const t: string = name(dtm);
//     const f: number = frequency(dtm);
//     const r: number = rank(dtm);

//     const [centroidX, centroidY] = pie.path.centroid(arc)
//     const arcPath = pie.path(arc) || undefined
//     const arcFill = colorScale(t);

//     return (

//       <AnimatedPie
//         animate={animate}
//         arcs={arc}
//         path={arcPath}
//         getKey={(_: ArcProps) => `${t}:${f}-${r}`}
//         onClickDatum={(d: Datum) => {
//           if(selected && selected?.length && selected===name(d)) {
//             setSelected('');
//           } else {
//             setSelected(name(d));
//           }
//         }}
//         getColor={(_: ArcProps) => arcFill}
//       />
//     );
//   });
// }}