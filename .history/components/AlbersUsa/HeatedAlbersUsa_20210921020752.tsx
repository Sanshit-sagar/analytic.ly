import React, { useState } from 'react'
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

                >
                    
                </AlbersUsa>

            </svg>
        </div>
    )
}