export interface Margin {
    top: number;
    left: number;
    bottom: number;
    right: number; 
}

export interface DataProps {
    timestamp: timestamp;
    end: Date; 
    intervalInMs: number;
    email: string;
    slug?: string; 
}


export interface TimeseriesChartProps {

}