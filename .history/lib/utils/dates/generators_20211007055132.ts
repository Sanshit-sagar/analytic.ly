
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
export const cycleGenerator = function* (arr: any[]) {
    let i = 0;
    while (true) {
        yield arr[i % arr.length];
        i++;
    }
};

export const iterableToArray = (Iterable<T> iterable) => {
    const data = [1, 2, 3, 1, 2, 4]
    const values = new Set(data);
    const uniqueValues = [...values]; // [1, 2, 3, 4]
}

const generatorToArray = gen => [...gen];

const isGeneratorFunction = (val: any) => {
    return Object.prototype.toString.call(val) === '[object GeneratorFunction]'
}

const isAsyncFunction = (val: any) => {
    return Object.prototype.toString.call(val) === '[object AsyncFunction]'
}

