import { geoCentroid } from 'd3-geo'
import { AlbersUsa } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
import { useTooltip, TooltipInPortal } from '@visx/tooltip'
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



export const HeatedAlbersUsa = ({ height, width, map, data }: IHeatedAlbersUsaProps) => {



}