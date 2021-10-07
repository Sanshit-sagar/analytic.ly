import { requireSession, users } from '@clerk/nextjs/api'

export type ClickType = {
    id: string; 
    cfRay: string; 
    timestamp: number; 
    user: string; 
    slug: string; 
}[]; 

export interface TimeFocusedClick {
    key: string;
    x: number;
    y: number;
    slug: string;
    msOfDay: number;
    secOfDay: number;
    secOfHour: number;
    minOfDay: number; 
    minOfHour: number;
    minOfWeek: number;
    score: unique;
    pageVisits: number;
    uniques: number;
    timestamp: number; 
    "localizedDatetime": string[]; 
}

export type UserClickstream = {
    clicks: ClickType[];
    start: Date;
    end: Date; 
}

type DetailedClick = {
    points: TimeFocusedClick;
    user: string; 
    uniques: number;
    mostViews: number; 
    mostUniques: number;
    mostFrequentVisitorIp: string;
    mostViewed: string; 
    lastViewedAt: string;  
    rangeZ: [1,11],
    rangeX: [2,2],
    rangeY: [0,86400000],
    size: 44,
}