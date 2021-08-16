import React, { useMemo } from 'react' 
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { GradientTealBlue } from '@visx/gradient'
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency'

const data = letterFrequency.slice(5);
const verticalMargin = 120; 

const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type IBarProps = {
    height: number;
    width: number;
    events?: boolean; 
}

const Bars = ({ width, height, events = false}: IBarProps) => {
    const yMax = height - verticalMargin;
    const xMax = width; 

    const xScale = useMemo(() => scaleBand<string>({
      range: [0, xMax],
      round: true,
      domain: data.map(getLetter),
      padding: 0.4,   
    }), [xMax]); 

    const yScale = useMemo(() => scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))]
    }), [yMax]);

    if(width < 10 || height < 10) return null;

    return (
        <svg width={width} height={height}>
            <GradientTealBlue id="teal" />
            <rect height={height} width={width} color="url(#teal)" rx={14} />
            <Group top={verticalMargin/2}>
                {data.map(d => {
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
                                if(events) {
                                    alert(`Clicked on ${JSON.stringify(Object.values(d))}`)
                                }
                            }}
                        />
                    );
                })}
            </Group>
        </svg>
    )

}

export default Bars