
export const dateRangeGenerator = function* (start: Date, end: Date, step: number = 1) {
    let d = start;
    while (d < end) {
        yield new Date(d);
        d.setDate(d.getDate() + step);
    }
};

export const epochRangeGenerator = function* (start: number, end: number, step: number = 1) {
    let i = start;
    while (i < end) {
        yield i;
        i += step;
    }
};


// 
const cycleGenerator = function* (arr: any[]) {
    let i = 0;
    while (true) {
        yield arr[i % arr.length];
        i++;
    }
};

const const data = [1, 2, 3, 1, 2, 4]
const values = new Set(data);
const uniqueValues = [...values]; // [1, 2, 3, 4]
