import { geoCentroid } from 'd3-geo'
import { AlbersUsa } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
import { useTooltip, TooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localEvent } from '@visx/event'
import type { FeatureShape, DataItem } from ''


import type { GeoJSON } from './types' 


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