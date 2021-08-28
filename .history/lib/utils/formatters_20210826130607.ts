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

export interface ScoredSlug {
    title: string;
    score: number;
    normalizedFreq?: number;
    rank?: number;
    uniqueScore?: number;
    normalizedUniqueScore?: number;
}

export interface SlugRankings {
    category: string;
    rankings: ScoredSlug[];
}

export function sanitizeSlug(slug: string): string {
    if(!slug.startsWith('/'))  slug = `/${slug}`; 
    return slug;
}

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

function isLimitInRange(limit: number | undefined, rangeEnd: number): boolean {
    return (limit===undefined) ? false : limit && limit < rangeEnd ? true : false;
}

function normalizeOutput(output: ScoredSlug[], maxScore: number) {
    output.map((slugInfo: ScoredSlug, _) => {
        slugInfo['normalizedFreq'] = slugInfo['score']/maxScore;
    });
    output = output.reverse();
    return output;
}

export function formatAndSortSlugs(input: string[], limit?: number) {
    try {
        let output : ScoredSlug[] = [];
        let counter: number = 0;

        if(input && input?.length) {
            input.map(function(value: string, index: number) {            
                if(index % 2 === 0) {
                    output.push({
                        title: value,
                        score: parseInt(input[index + 1]),
                        rank: ++counter,
                    });
                 } 
             });
        }
        output = isLimitInRange(limit, output.length) ? output.slice(limit) : output;
        output = normalizeOutput(output, output[0].score); 
        return output; 
    } catch(error) {
        return input;
    }
}

export function formatClick(ufmtClick: any) {
    const fmtSlug = JSON.parse(ufmtClick);
    const reqInfo = fmtSlug.requestHeaders

    if(reqInfo && reqInfo.cfRay && reqInfo.slug && reqInfo.destination && reqInfo.ip) {
        const fmtUa = formatUserAgent(reqInfo.system)

       return { 
            cfRay: reqInfo.cfRay,
            workerId: reqInfo.workerId,
            slug: formatSlug(reqInfo.slug),
            views: formatSlug(reqInfo.slug), // slug passed as args to views col SWR hook
            destination: formatDestination(reqInfo.destination),
            os: fmtUa['os'], 
            engine: fmtUa['engine'],
            browser: fmtUa['browser'],
            country: reqInfo.country,
            location: formatLocation(reqInfo.city, reqInfo.postalCode, reqInfo.metroCode),
            geodata: formatCoordinate(reqInfo.longitude, reqInfo.latitude, reqInfo.timezone).coordinatesStr, 
            ipAddress: formatIp(reqInfo.ip),
            tlsVersion: reqInfo.tlsVersion,
            httpProtocol: reqInfo.httpProtocol,
            asn: reqInfo.asn,
            clientTcpRtt: reqInfo.clientTcpRtt,
            clientAcceptEncoding: reqInfo.clientAcceptEncoding,
            tlsCipher: reqInfo.tlsCipher,
            timestamp: formatTimestamp(reqInfo.timestamp),
        }; 
    }
    return null;
}

export function formatClickstream(ufmtClicks: any[]): any[] {
    let fmtClicks: any[] = []; 
    ufmtClicks.map((ufmtClick: any) => {
        let fmtClick = formatClick(ufmtClick);
        if(fmtClick) {  
            fmtClicks.push({ ...fmtClick });  
        }
    });
    fmtClicks.sort((a,b) => parseInt(b.timestamp) - parseInt(a.timestamp));
    return fmtClicks; 
}
