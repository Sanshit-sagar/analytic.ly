import React, { useState } from "react";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { GradientPinkBlue } from "@visx/gradient";
import { TransitionKeyProps } from "react-spring";

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
};


function FreqPieChart({
  freqs,
  width,
  height,
  margin = defaultMargin,
  animate = true,
}: PieProps) {
  const [selected, setSelected] = useState('');
  const features: Datum[] = freqs && freqs?.length > 1 ? freqs.slice(0, 4) : (freqs || []);
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;
  // const top = centerY + margin.top;
  // const left = centerX + margin.left;

  const name: (d: Datum) => string = (d: Datum) => d.title; 
  const frequency: (d: Datum) => number = (d: Datum) => parseInt(`${d.score}`);
  const rank: (d: Datum) => number = (d: Datum) => parseInt(`${d.rank}`)

  const colorScale = scaleOrdinal({
    domain: freqs.map((freq: Datum, _: number) => freq.score),
    range: [
      "rgba(255,30,91,1)",
      "rgba(0,30,91,0.8)",
      "rgba(255,30,91,0.6)",
      "rgba(255,2,255,0.4)"
    ]
  });

  const pieSortValues: (n1: number, n2: number) => number = (nA: number, nB: number) => {
    return parseInt(`${nB}`) - parseInt(`${nA}`);
  }

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
          {(pie) => {
            return pie.arcs.map((arc, index: number) => {
              const dtm: Datum = arc.data;
              const t: string = name(dtm);
              const f: number = frequency(dtm);
              const r: number = rank(dtm);

              // const [centroidX, centroidY] = pie.path.centroid(arc);
              // const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc) || undefined
              const arcFill = colorScale(t);

              return (

                <AnimatedPie
                  arcs={arc}
                  path={arcPath}
                  animate={animate}
                  getKey={(_: ArcProps) => t}
                  onClickDatum={(d: Datum) => {
                    if(selected && selected?.length && selected===name(d)) {
                      setSelected('');
                    } else {
                      setSelected(name(d));
                    }
                  }}
                  getColor={(_: ArcProps) => arcFill}
                />
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}

const fromLeaveTransition = ({ endAngle }: ArcEndProps) => ({
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0
});
const enterUpdateTransition = ({ startAngle, endAngle }: ArcProps) => ({
  startAngle,
  endAngle,
  opacity: 1
});

interface ArcEndProps {
  endAngle: any;
}

interface ArcProps {
  startAngle: any;
  endAngle: any;
}

interface AnimatedPieProps {
  animate: boolean;
  arcs: ArcProps;  
  path: Arc<any, Datum>;
  getKey: (arc: ArcProps) => TransitionKeyProps; 
  getColor: ((a: {startAngle: any, endAngle: any}) => string);
  onClickDatum: any;
}

