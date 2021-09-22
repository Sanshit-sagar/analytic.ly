import { geoCentroid } from 'd3-geo'
import { AlbersUsa } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
import { useTooltip, TooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import type { FeatureShape, DataItem, GeoJSON } from './types'

import { useGloballyConsistentColors } from '../../../'

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

interface IHeatedAlbersUsaProps {
    height: number;
    width: number;
    features: GeoJSON;
    source: { 
        name: string; 
        value: number; 
    }[]; 
}

const HeatedAlbersUsa = ({ height, width, features, source }: IHeatedAlbersUsaProps) => {



}