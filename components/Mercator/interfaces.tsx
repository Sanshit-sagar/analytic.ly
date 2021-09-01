

export type ZoomIProps = {
    width: number;
    height: number;
};

// (x,y) are rounded to closest ints,
// (lng,lat) have up to three decimal places
export interface Coordinate {
    longitude: number;
    latitude: number;
    x: number;
    y: number; 
}

export interface GeoDatum {
    hash: string;
    cfRay: string; 
    city: string; 
    country: string;
    postalCode: number;
    metroCode: number;
    timezone: string;
    timestamp: number;
    count: number;
    coordinate: Coordinate;
}

export type GeoMercatorProps = {
    width: number;
    height: number;
    data: GeoDatum[]; 
    markers: Coordinate[];
}

export interface FeatureShape {
    type: 'Feature';
    id: string;
    geometry: { 
        coordinates: [number, number][][]; 
        type: 'Polygon' 
    };
    properties: { 
      name: string 
    };
}

export interface ICustomMercatorProps {
    zoom: any;
    scale: number;
    translate: [number, number];
    simplified: any; 
    tooltipTop: number | undefined;
    tooltipLeft: number | undefined;
    hideTooltip: () => void;
    showTooltip: (tooltipData: any) => void;
    tooltipData: any;

}