import React, { Fragment,  useState } from 'react'
import { geoCentroid } from 'd3-geo'
import { AlbersUsa } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
import { useTooltip, useTooltipInPortal } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import type { FeatureShape, DataItem } from './types'

import { useGloballyConsistentColors } from '../../hooks/useColors' 
import { TooltipWrapper } from '../../primitives/Shared'

const BACKGROUND = 'transparent' 
const COLOR_RANGE = [
    [
        "#ffb01d",
        "#ffa020",
        "#ff9221",
        "#ff8424",
        "#ff7425",
        "#fc5e2f",
        "#f94b3a",
        "#f63a48"
    ],
]; 

export interface IHeatedAlbersUsaProps {
    height: number;
    width: number;
    map: FeatureShape[];
    data: DataItem[]; 
}

const color = scaleQuantize({
    domain: [500000, 38000000],
    range: COLOR_RANGE[0],
}); 

let tooltipTimeout: number = 0; 

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
    } = useTooltip<DataItem>(); 


    const { containerRef, TooltipInPortal } = useTooltipInPortal({ scroll: true })
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <div style={{ position: 'relative' }}>
            <svg ref={containerRef} height={height} width={width}>
                <AlbersUsa<FeatureShape>
                    data={map}
                    scale={scale}
                    translate={[centerX, centerY - 25]}
                >
                    {({ features }) => 
                        features.map(({feature, path, projection}, index: number) => {
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
                                        onMouseMove={(event: MouseEvent) => {
                                            setHoveredId(datum.name);
                                            if(tooltipTimeout) clearTimeout(tooltipTimeout);

                                            const { x, y}
                                        }}
                                        onMouseLeave={(event: MouseEvent) => {
                                            setHoveredId(null);
                                            tooltipTimeout = window.setTimeout(() => {
                                                hideTooltip(); 
                                            }, 3000)
                                        }}
                                    />
                                </Fragment>
                            )
                        }
                    })}
                </AlbersUsa>
            </svg>
        </div>
    )
}