import { AxisScale } from '@visx/axis'

export type TimeStamp = number;
export type ClickScore = number;
export type ClickFmtTime = string; 
export type ClickDate = Date; 

export interface ClickHistoryProps {
    amount: number;
    range: string;
    interval: string;
}

export interface Datum {
    index: number;
    timestamp: TimeStamp;
    clickscore: ClickScore;
    clickfmttime: ClickFmtTime; 
    clickdate: ClickDate; 
}

export interface GraphDetails {
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
    data: Datum[];
    margin?: MarginProps; 
}

export type TooltipData = Datum

export interface LineChartProps {
    data: Datum[];
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
    xTickFormat?: string;
    children?: any; 
}