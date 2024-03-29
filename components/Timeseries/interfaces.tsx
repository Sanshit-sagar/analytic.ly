import { AxisScale } from '@visx/axis'
import { ReactNode } from 'react'

export type TimeStamp = number;
export type ClickScore = number;
export type ClickFmtTime = string; 
export type ClickDate = Date; 

export type SelectionValue = number | string;
export type AnimationTrajectory = 'outside' | 'center' | 'min' | 'max' | undefined;
export type AxisDirection = 'bottom' | 'left' | 'top' | 'right' | undefined; 

export interface TickCount {
    y: number;
    x: number; 
}

export interface SelectionOption {
    id: number;
    label: string;
}

export interface ClickHistoryProps {
    amount: number;
    range: string;
    interval: string;
}

export interface Datum {
    index: number;
    timestamp: TimeStamp;
    clickscore: ClickScore;
    clickdate: ClickDate; 
    clickfmttime?: ClickFmtTime; 
}

export interface GraphDetails {
    start: Date;
    end: Date;
    durationInMs?: number;
    tickSizeInMs?: number;
    numIntervals?: number; 
    maxScore?: number;
    minScore?: number;
    cummulativeClicks?: number; 
    nonEmptyDatums?: number;
    allDatums?: number; 
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
    margin: MarginProps; 
}

export interface SecondaryChartProps {
    data: Datum[]; 
    minTimestamp: number; 
    width: number;
    height: number;
    margin?: MarginProps
}

export interface BrushProps { 
    data: Datum[]; 
    minTimestamp: number; 
}

export interface HeightProps {
    height: number;
    width: number; 
}

export type TooltipData = Datum

export interface LineChartProps {
    data: Datum[];
    loading: boolean;
    error: any;
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

export interface AreaChartProps {
    data: Datum[];
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    width: number;
    yMax: number;
    margin: MarginProps;
    gradientColor: string;
    stroke?: string;
    hideBottomAxis?: boolean;
    hideLeftAxis?: boolean;
    hideGrid?: boolean;
    top?: number;
    left?: number;
    children?: ReactNode;
}

export type AnnotationProps = {
    width: number;
    height: number;
    compact?: boolean;
};

export interface FormattedTimes {
    timestamp: number; 
    fmtTimestamp: string;
}

export interface Bounds {
    x0: number; 
    x1: number;
    y0: number;
    y1: number; 
}