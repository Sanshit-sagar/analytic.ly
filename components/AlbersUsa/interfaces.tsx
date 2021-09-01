export type GeoAlbersUsaProps = {
    width: number;
    height: number;
};
  
export interface FeatureShape {
    type: 'Feature';
    id: string;
    geometry: { coordinates: [number, number][][]; type: 'Polygon' };
    properties: { name: string };
}