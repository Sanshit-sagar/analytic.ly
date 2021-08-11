import { humanReadable } from './dateUtils'

export function formatSlug(slug: string | null): string {
    if(!slug?.length) return '';
    return (slug.startsWith('/hashed')) ? slug.substring(8) : slug.substring(1)
}

export function formatCoordinatePoint(ptArr: string[]): string {
    if(!ptArr?.length) return "-";

    return `${ptArr[0]}.${ptArr[1].substring(0,2)}`;
}

export function formatCoordinate(longitude: string, latitude: string): string {
    if(!longitude || !latitude) return "-";

    let xArr: string[] = latitude.split('.');
    let yArr: string[] = longitude.split('.');
    return `(${formatCoordinatePoint(xArr)}, ${formatCoordinatePoint(yArr)})`;
}

export function formatLocation(city: string, postalCode: string | number, timezone: string): string {
    return `${city}, ${postalCode} (${timezone})`;
}

export function formatTimestamp(timestamp: string | number | null) {
    if(!timestamp) return '';

    let fmtTimestamp = parseInt(`${timestamp}`) 

    return { 
        'timeAgo': fmtTimestamp ? humanReadable(fmtTimestamp) : '-', 
        'localeTime': fmtTimestamp ? new Date(fmtTimestamp).toLocaleString() : '-'
    };
}
