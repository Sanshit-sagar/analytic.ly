
type GeoMercatorProps = {
          width: number;
          height: number;
          events?: boolean;
          markers: Datum[];
};

interface Datum {
lat:      
lng:      
hash?     
city?     
count     g; 
posta     mber; 
metro     ber;
timez     g; 
count     
};

interface FeatureShape {
type: 'Feature';
id: string;
geometry: { coordinates: [number, number][][]; type: 'Polygon' };
properties: { name: string };
}