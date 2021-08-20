import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { PatternWaves, PatternLines } from '@visx/pattern';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import useSWR from 'swr'
import { fetcher } from '../../lib/utils/fetcher'
import { ScoredSlug } from '../../lib/utils/formatters'
import {
  LegendOrdinal,
  LegendItem,
  LegendLabel,
} from '@visx/legend';


type TooltipData = {
    key: string;
    value: string; 
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
};

export type BarsProps = {
  data: ScoredSlug[];
  width: number;
  height: number;
  events?: boolean;
  backdrop?: string; 
};

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 100,
    backgroundColor: 'rgba(245,243,226,1)',
    color: 'rgba(245,243,226,1)',
};

let tooltipTimeout: number;
const verticalMargin = 25;

function LegendDemo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ lineHeight: '0.9em', fontSize: '10px', fontFamily: 'arial', padding: '10px 10px', float: 'left', border: '1px solid rgba(255,255,255,0.3)', borderRadius:'8px', margin: '5px 5px' }}>
      <div style={{ fontSize: '12px', marginBottom: '10px', fontWeight: 100 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
const ordinalColorScale = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#fae856', '#f29b38', '#e64357', '#8386f7'],
});


function Bars({ data, width, height, events = false, backdrop }: BarsProps) {
  
  const getLetter = (s: ScoredSlug) => s.slug;
  const getLetterFrequency = (s: ScoredSlug) => Number(s.normalizedFreq) * 100;

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({ scroll: true });
  // const background = '#612efb';
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax],
  );
  
  const letterScale = scaleBand({
    domain: data.map(getLetter),
    padding: 0.2,
  });

  if(width < 10) return null;

  return  (
    <>
        <LegendDemo title="Ordinal">
          <LegendOrdinal 
            scale={ordinalColorScale} 
            labelFormat={(label) => `Label Here ${label}`}
          >
            {labels => (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {labels.map((label, i) => (
                  <LegendItem
                    key={`legend-quantile-${i}`}
                    margin="0 5px"
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(label)}`);
                    }}
                  >
                    <svg width={15} height={15}>
                      <rect fill={label.value} width={15} height={15} />
                    </svg>
                    <LegendLabel align="left" margin="0 0 0 4px">
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                ))}
              </div>
            )}
          </LegendOrdinal>
        </LegendDemo>
        <svg ref={containerRef} width={width} height={height}>
            <PatternWaves id="waves" height={4} width={4} stroke={'white'} strokeWidth={1} />
            <PatternLines
                id={'one'}
                height={6}
                width={6}
                stroke="white"
                strokeWidth={1}
                orientation={['horizontal']}
              />
               <PatternLines
                id={'two'}
                height={6}
                width={6}
                stroke="white"
                strokeWidth={1}
                orientation={['diagonalRightToLeft']}
              />
              <PatternLines
                id={'three'}
                height={6}
                width={6}
                stroke="white"
                strokeWidth={1}
                orientation={['vertical', 'horizontal']}
              />
            <rect width={width} height={height} fill={'#eff28'} rx={14} />
            <Group top={verticalMargin / 2}>
                {data.map((d, i) => {
                    const letter = getLetter(d);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
                    const barX = xScale(letter);
                    const barY = yMax - barHeight;
                    return (
                      <>
                       
                        <Bar
                          key={`bar-${letter}`}
                          x={barX}
                          y={barY}
                          width={barWidth}
                          height={barHeight}
                          fill={`url(#${backdrop})`}
                          onClick={() => {
                              if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                          }}
                          onMouseLeave={() => {
                              tooltipTimeout = window.setTimeout(() => {
                              hideTooltip();
                              }, 300);
                          }}
                          onMouseMove={event => {
                              if (tooltipTimeout) clearTimeout(tooltipTimeout);
                              const eventSvgCoords = localPoint(event);
                              const left = (barX ? barX : 0) + barWidth/2;
                              showTooltip({
                                  tooltipData: { 
                                      key:`bar-${letter}`,
                                      value: `${getLetterFrequency(d)}`,
                                      height: barHeight,
                                      width: barWidth,
                                      index: i,
                                      x: xScale(letter) || 0,
                                      y: barHeight,
                                      color: 'rgba(255,255,255,1)',
                                  },
                                  tooltipTop: eventSvgCoords?.y,
                                  tooltipLeft: left,
                              })
                          }}
                        />
                      </>
                  
                    );
                })}
            </Group>
          </svg>
        
        {tooltipOpen && tooltipData && (
            <TooltipInPortal 
              top={tooltipTop} 
              left={tooltipLeft} 
              style={tooltipStyles}
            >
            <div style={{ color: 'red' }}>
              <strong>
                {tooltipData.key}
              </strong>
              <p> {JSON.stringify(tooltipData.value)} </p> 
            </div>
            </TooltipInPortal>
        )}
    </>
  );
}

const useUniques = (category: string) => {
  const { data, error } = useSWR(`/api/users/sanshit.sagar@gmail.com/frequencies/${category}`, fetcher);

  return {
    data: data?.categoryFrequencies || null,
    loading: !data && !error,
    error: error 
  }
}

interface ErrorProps {
  error: any;
}
interface BarProps {
  category: string; 
  backdrop: string;
}

const BarSkeleton = () => <p> loading.. </p>
const BarError = ({ error }: ErrorProps) => {
  return (
    <p> Error! {error.message} </p>
  ); 
}

const RankedBar = ({ category, backdrop }: BarProps) => {
  if(!category) return <BarSkeleton />

  const { data, loading, error } = useUniques(category);

  if (loading) return <BarSkeleton />;
  if (error)  return <BarError error={error} />;
  if (!data)  return <p> No data to show </p> 

  return (
    <div style={{ height: '300px', width: '300px', margin: '1.5%' }}>
      <ParentSize>
        {({ width, height }) => {
          return (
            <Bars 
              data={data} 
              width={width} 
              height={height}
              backdrop={backdrop}
            /> 
          );
        }}
      </ParentSize>
    </div>
  )
}

const RankedBars = () => {
  return (
    <rect height={'350px'} width={'1500px'} rx={15} ry={15} fill={'yellow'}>
      <div style={{ height: '300px', width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'nowrap'  }}>
        <RankedBar category={'ip'} backdrop={'one'}/> 
      </div>
    </rect>
  )
}


export default RankedBars