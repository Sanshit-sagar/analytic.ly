
const dayOfYear = (date: number) => {
    let diff = date - new Date(date.getFullYear(), 0, 0).getDate();
    return Math.floor( / 1000 / 60 / 60 / 24);

const daysInMonth = (year: number, month) => new Date(year, month, 0).getDate()
const formatDuration = (ms: number) => {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
      .join(', ');
};
const formatSeconds = (s: number) => {
    const [hour, minute, second, sign] =
      s > 0
        ? [s / 3600, (s / 60) % 60, s % 60, '']
        : [-s / 3600, (-s / 60) % 60, -s % 60, '-'];
  
    return (
      sign +
      [hour, minute, second]
        .map(v => `${Math.floor(v)}`.padStart(2, '0'))
        .join(':')
    );
};
const dateRangeGenerator = function* (start, end, step = 1) {
    let d = start;
    while (d < end) {
      yield new Date(d);
      d.setDate(d.getDate() + step);
    }
};
const addMinutesToDate = (date, n) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 60000);
    return d.toISOString().split('.')[0].replace('T',' ');
};

const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

onst addWeekDays = (startDate, count) =>
  Array.from({ length: count }).reduce(date => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (date.getDay() % 6 === 0)
      date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
    return date;
  }, startDate);
