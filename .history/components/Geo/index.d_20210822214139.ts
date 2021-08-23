
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
 
country?: stri
ng; 
postalCode?: n
umber; 
metroCode?: nu
mber;
timezone: stri
ng; 
count: number;
 
};

interface FeatureShape {
type: 'Feature';
id: string;
geometry: { coordinates: [number, number][][]; type: 'Polygon' };
properties: { name: string };
}