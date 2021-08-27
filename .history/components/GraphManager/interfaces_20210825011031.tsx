import { AxisScale } from '@visx/axis'


export type TimeStamp = number;
export type ClickScore = number;
export type ClickDate = Date; 

export interface ClickHistoryProps {
    quantity: string;
    timeAgo: string;
    tickSize: string;
}

export interface Datum {
    index: number;
    timestamp: TimeStamp;
    clickscore: ClickScore;
    clickdate: ClickDate; 
}

export interface ClickHistory {
    clicks?: Datum[];
    start: ClickDate;
    end?: ClickDate;
    durationInMs?: number;
    tickSize?: number;
    numIntervals?: number; 
};

export interface MarginProps {
    top: number;
    left: number; 
    bottom: number; 
    right: number; 
}

export interface PrimaryChartProps {
    height: number; 
    width: number;
    data: ClickHistory;
    margin?: MarginProps; 
}

export type TooltipData = Datum

export interface LineChartProps {
    data: Datum;
    width: number;
    yMax: number;
    margin: MarginProps;
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    hideBottomAxis?: boolean;
    hideLeftAxis?: boolean;
    stroke: string;
    top?: number;
    left?: number;
    yTickFormat: string;
    children?: any; 
}