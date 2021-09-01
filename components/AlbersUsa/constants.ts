export const COLORS: string[] = [
    'rgba(50,255,150,1.0)', 
    'rgba(50,255,150,0.6)', 
    'rgba(50,255,150,0.4)', 
    'rgba(50,255,150,0.2)', 
    'transparent', 
];

// X and Y adjustments to individual states
export const COORD_OFFSETS: Record<string, number[]> = {
  FL: [11, 3],
  AK: [0, -4],
  CA: [-7, 0],
  NY: [5, 0],
  MI: [13, 20],
  LA: [-10, -3],
  HI: [-10, 10],
  ID: [0, 10],
  WV: [-2, 4],
  KY: [10, 0],
  TN: [0, 4],
};

export const IGNORED = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD'];

export const BACKGROUND = 'transparent'