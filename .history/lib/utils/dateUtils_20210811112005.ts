import { DateTime } from 'luxon'

export function getLocaleTimestring(timestamp: string | number | null) {
    return timestamp ? new Date(timestamp).toLocaleTimeString() : '';
}

export function getLocaleDatestringFromDate(date: string | null) {
    return date ? new Date(date).toLocaleDateString() : ''
}

export function getDateString(timestamp: string | number | null) {
    return timestamp ? new Date(timestamp).toDateString() : ''
}

export const isValidDate = (date: string) => {
    let isDateObject = Object.prototype.toString.call(date)==='[object Date]'
    let isFiniteAsInt = isFinite(parseInt(date))
    let isNotNull = date?.length

    return isNotNull ? isDateObject && isFiniteAsInt : false;
}


const units = new DateTime();
units.second = 1000;
units.minute = units.second * 60;
units.hour = units.minute * 60;
units.day = units.hour * 24;
units.local = units.day * 7;
units.month = units.day * 30;
units.year = units.day * 365;

const regexp = /(second|minute|hour|day|week|month|year)s?/;

export function humanReadable(time: number | string | null) {
  if (!time || typeof time === 'number') {
    return time;
  }

  let result = Number.NaN;

  time = time.replace(/([^a-z\d.-]|and)+/g, ' ');

  for (;;) {
    const match = time.match(regexp);
    if (!match) {
      return result;
    }

    const matchedNumber = time.slice(0, match.index).trim();
    const unit = units[match[1]];
    let number: number | string = 1;
    let numm: number = 1;
    if (matchedNumber.length > 0) {
      number = Number.parseFloat(matchedNumber);
      if (Number.isNaN(number)) {
            if(matchedNumber===typeof(number)) {
                number =parseInt(`${matchedNumber}`);
            } else {
                number = JSON.stringify(parseInt(matchedNumber))
            }
      }
      numm = parseInt(`${number}`);
    }

    if (Number.isNaN(result)) {
      result = 0;
    }

    result += numm * unit;
    time = time.slice((match.index || 0) + match[0].length);
  }
};