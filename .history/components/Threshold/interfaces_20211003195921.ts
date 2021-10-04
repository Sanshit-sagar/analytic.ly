


interface Click {
    date: Date;
    groupA: number;
    groupB: number; 
}

{ 
    top:number; 
    bottom: number; 
    left: number; 
    right:number;
};

interface ThresholdProps {
    clicks: Click[];
    height: number;
    width: number;
    margin?: Margin;
}