import React, { Fragment,  useState } from 'react'
import { geoCentroid } from 'd3-geo'
import { AlbersUsa, Graticule } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'

import type { FeatureShape, DataItem } from './types'

import { useGloballyConsistentColors } from '../../hooks/useColors' 
import { TooltipWrapper } from '../../primitives/Shared'
import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'

const BACKGROUND = 'transparent' 
// const COLOR_RANGE = [
//     [
//         "#ffb01d",
//         "#ffa020",
//         "#ff9221",
//         "#ff8424",
//         "#ff7425",
//         "#fc5e2f",
//         "#f94b3a",
//         "#f63a48"
//     ],
// ]; 

export interface IHeatedAlbersUsaProps {
    height: number;
    width: number;
    map: FeatureShape[];
    data: DataItem[]; 
}

let tooltipTimeout: number = 0

export const HeatedAlbersUsa = ({ height, width, map, data }: IHeatedAlbersUsaProps) => {

    const centerX = height / 2;
    const centerY = width / 2;
    const scale = (height + width) / 1.55

    const {
        tooltipOpen,
        tooltipTop,
        tooltipLeft,
        tooltipData,
        showTooltip,
        hideTooltip,
    } = useTooltip<DataItem>()
    
    const colors = useGloballyConsistentColors()
    const color = scaleQuantize({
        domain: [500000, 38000000],
        range: [
            colors.funky, 
            colors.funkyText, 
            colors.text,
            colors.hiContrast, 
            colors.accentHover, 
            colors.accentPressed, 
        ],
    });
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <div style={{ position: 'relative' }}>
            <svg height={height} width={width}>
                <AlbersUsa<FeatureShape>
                    data={map}
                    scale={scale}
                    translate={[centerX + 300, centerY - 250]}
                >
                    {({ features, path }) => 
                    <g>
                        <Graticule 
                            graticule={g => features.path(g) || ''} 
                            stroke={GRATICULE_STROKE}
                        />
                        {features.map(({ feature, path, projection }, index: number) => {
                            const datum: DataItem | undefined = data.find((index) => index.name === feature.properties.name)
                            const coords: [number, number] | null = projection(geoCentroid(feature))

                            if(!datum || !coords) return null; 

                            return (
                                <Fragment key={`state-indexed-${index}`}>
                                    <path
                                        key={`path-for-state-indexed-${index}`}
                                        d={path || '' }
                                        fill={datum.name === hoveredId ? 'ffdf75' : color(datum.value)}
                                        stroke={BACKGROUND}
                                        strokeWidth={0.5} 
                                        style={{ transition: '0.3s all' }}
                                        onMouseMove={(event: React.MouseEvent<SVGPathElement>) => {
                                            setHoveredId(datum.name);
                                            if(tooltipTimeout) clearTimeout(tooltipTimeout);

                                            const lpCoordinate = localPoint(event);
                                            showTooltip({
                                                tooltipData: datum,
                                                tooltipTop: lpCoordinate?.y,
                                                tooltipLeft: lpCoordinate?.x,
                                            });
                                        }}
                                        onMouseLeave={(_event: React.MouseEvent<SVGPathElement>) => {
                                            setHoveredId(null);
                                            tooltipTimeout = window.setTimeout(() => {
                                                hideTooltip(); 
                                            }, 3000)
                                        }}
                                    />
                                    {datum.name===hoveredId && (
                                        <text
                                            transform={`translate(${coords})`}
                                            fontSize={12}
                                            style={{
                                                fill: "#782f0b",
                                                fontFamily: "sans-serif",
                                                cursor: "default"
                                              }}
                                            textAnchor="middle"
                                        >
                                            {datum.name}
                                        </text>
                                    )}  
                                </Fragment>
                            );
                        })}
                    </g>
                    }
                </AlbersUsa>
            </svg>
            {tooltipOpen && tooltipData && (
                <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={{
                        ...defaultStyles,
                        minWidth: 175,
                        backgroundColor: colors.canvas,
                        zIndex: 4 
                    }}
                >
                    <TooltipWrapper>
                        <Heading size='1'> 
                            {tooltipData.name} 
                        </Heading>
                        <Text size='1' css={{ color: '$text' }}> 
                            {tooltipData.value} 
                        </Text>
                    </TooltipWrapper>
                </TooltipWithBounds>
            )}
        </div>
    );
}