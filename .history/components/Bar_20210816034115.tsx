import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
// import { SeriesPoint } from '@visx/shape/lib/types';
import { localPoint } from '@visx/event';

const data = letterFrequency.slice(5);
const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

type TooltipData = {
    key: string;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
};

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
};

let tooltipTimeout: number;

export default function Example({ width, height, events = false }: BarsProps) {
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
  // scales, memoize for performance
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

  return width < 10 ? null : (
    <div>
        <svg ref={containerRef} width={width} height={height}>
            <GradientTealBlue id="teal" />
            <rect width={width} height={height} fill="url(#teal)" rx={14} />
            <Group top={verticalMargin / 2}>
                {data.map((d, i) => {
                    const letter = getLetter(d);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
                    const barX = xScale(letter);
                    const barY = yMax - barHeight;
                    return (
                        <Bar
                            key={`bar-${letter}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill="rgba(23, 233, 217, .5)"
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
                                        height: barHeight,
                                        width: barWidth,
                                        index: i,
                                        x: xScale(letter) || 0,
                                        y: barHeight,
                                        color: "rgba(255, 255, 255, .5)",
                                    },
                                    tooltipTop: eventSvgCoords?.y,
                                    tooltipLeft: left,
                                })
                            }}
                        />
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
                <strong>{tooltipData.key}</strong>
            </div>
            </TooltipInPortal>
        )}
    </div>
  );
}
