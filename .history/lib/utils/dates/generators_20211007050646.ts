
export const dateRangeGenerator = function* (start: Date, end: Date, step = 1) {
    let d = start;
    while (d < end) {
        yield new Date(d);
        d.setDate(d.getDate() + step);
    }
};
  