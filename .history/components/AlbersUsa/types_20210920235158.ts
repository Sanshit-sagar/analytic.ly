export interface FeatureShape {
    type: "Feature";
    id: string;
    geometry: { 
        coordinates: [number, number][][]; 
        type: "Polygon" 
    }; 
    properties: { name: string };
}

export type GeoJSON = {
    type: "FeaturesCollection";
    features: FeatureShape[]; 
}

export type DataItem = {
    name: string;
    value: number;
}

export type TooltipData = {
    key: string; 
    index: number;
    height: number;
    width: number;
    x: number;
    y: number; 
    color: string;
}