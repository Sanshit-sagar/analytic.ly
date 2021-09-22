
import { AlbersUsa } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
import { }


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