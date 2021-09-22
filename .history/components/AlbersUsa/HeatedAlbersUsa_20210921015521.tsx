
import { AlbersUsa } from '@visx/'


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