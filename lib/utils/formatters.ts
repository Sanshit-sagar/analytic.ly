import { humanReadable } from './dateUtils'
var parser = require('ua-parser-js');

interface ICoordinate {
    latitude: string,
    longitude: string,
}

interface IGeodata {
    coordinates: ICoordinate,
    coordinatesStr: string,
    timezone: string,
}

interface IUserAgent {
    browser: string,
    engine: string,
    os: string,
};

export function formatSlug(slug: string | null): string {
    return (!slug?.length) ? '' : slug;
}

export function formatCoordinatePoint(ptArr: string[]): string {
    if(!ptArr?.length) return "-";
    return `${ptArr[0]}.${ptArr[1].substring(0,2)}`;
}

export function formatUserAgent(useragent: string): IUserAgent {
    var ua = useragent?.length ? parser(useragent) : '';

    return {
        'browser': useragent?.length ? ua.browser?.name : '',
        'engine': useragent?.length ? ua.engine.name : '',
        'os': useragent?.length ?  ua.os.name : '',
    };
}

export function formatCoordinate(longitude: string, latitude: string, timezone: string): IGeodata {
    let xArr: string[] = latitude ? latitude.split('.') : [];
    let yArr: string[] = longitude ? longitude.split('.') : []; 

    return { 
        coordinates: { 
            latitude: latitude || '', 
            longitude: longitude || '' 
        },
        coordinatesStr: `(${xArr.length ? formatCoordinatePoint(xArr) : '-'}, ${yArr.length ? formatCoordinatePoint(yArr) : '-'})`,
        timezone: `[${timezone}]`,
    };; 
}

export function formatLocation(city: string, postalCode: string | number, timezone: string): string {
    return `${city}, ${postalCode} (${timezone})`;
}

export function formatDestination(rawUrl: string) {
    let cleanUrl = new URL(rawUrl);
    return cleanUrl.hostname; 
}

export function formatTimestamp(timestamp: string | number | null) {
    if(!timestamp) return '';

    let fmtTimestamp = parseInt(`${timestamp}`) 

    return { 
        'timeAgo': fmtTimestamp ? humanReadable(fmtTimestamp) : '-', 
        'localeTime': fmtTimestamp ? new Date(fmtTimestamp).toLocaleString() : '-'
    };
}

export function formatIp(ip: string) {
    return { ip,};
}