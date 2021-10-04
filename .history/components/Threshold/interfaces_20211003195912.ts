


interface Click {
    date: Date;
    groupA: number;
    groupB: number; 
}

interface ThresholdProps {
    clicks: Click[];
    height: number;
    width: number;
    margin?: { 
        top:number; 
        bottom: number; 
        left: number; 
        right:number;
    };
}