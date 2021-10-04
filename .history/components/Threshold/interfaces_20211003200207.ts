interface Click {
    date: Date;
    groupA: number;
    groupB: number; 
}

interface Margin { 
    top: number; 
    bottom: number; 
    left: number; 
    right: number;
}

export interface ThresholdProps {
    clicks: Click[];
    height: number;
    width: number;
    margin?: Margin;
}