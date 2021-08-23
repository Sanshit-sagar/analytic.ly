
type GeoMercatorProps = {
    width: number;
    height: number;
    events?: boolean;
    markers: Datum[];
};

interface Datum {
    lat: number;
    lng: number; 
    hash?: number; 
    city?: number; 
    country?: string; 
    postalCode?: number; 
    metroCode?: number;
    timezone: string; 
    count: number; 
}

interface FeatureShape {
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



interface MarkerProps { 
    [key: string]: { 
      rankedSlug: RankedSlug 
    }
  };

interface Coordinate {
    x: number;
    y: number; 
    latitude: number; 
    longitude: number; 
    hash: string; 
  }

interface RankedSlug {
    lat?: number | 0;
    lng?: number | 0;
    count?: number | 0;
    metroCode?: string | 0;
    postalCode?: number | 0;
    hash?: string | '';
    city?: string | '';
    timezone?: string | '';    
    country?: string | '';
    coordinate?: Coordinate;
  }


export declare module geo {
    GeoMercatorProps,
    Datum,
    FeatureShape
}; 