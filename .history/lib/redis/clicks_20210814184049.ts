import redis from './index'

import { 
    formatSlug,
    formatCoordinate, 
    formatLocation, 
    formatDestination,
    formatIp,
    formatTimestamp,
    formatUserAgent
} from '../utils/formatters';

function formatClick(ufmtClick: any) {
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

export const getClickstream = async (email: string | string[]): Promise<any[] | null> => {

    let clickstream: any[] = [];

    if(!email) {
        clickstream = await redis.lrange(`clickstream`, 0, -1); // DONE
    } else  {
        clickstream = await redis.lrange(`clickstream.user.${email}`, 0, -1); // DONEL
    } 

    return formatClickstream(clickstream);
}

export const getClickByCfRay = async (cfRay: string | string[]): Promise<any> => {
    console.log('Getting clicks by cfRay');
    const clickWithCfRay: any = await redis.hget('cfray.to.click', cfRay); 
    console.log(`Got the value ${clickWithCfRay.requestHeaders}`); 

    return formatClick(clickWithCfRay); 
}

export const getClickFromField = async (fieldName: string | string[], fieldValue: string | string[]): Promise<any> => {
    
    if(fieldName?.length && fieldValue?.length) {
        if(fieldName==='cfRay') {
            return getClickByCfRay(fieldValue);
        } else {
            return null; 
        }
    }
    return null; 
}

export async function getClickstreamStartingAt(start: number, isAsc: boolean | null): Promise<string[]>  {
    let clicks: string[] = [];
    // TODO
    // TODO
    return clicks;
}

export async function getClickstreamEndingAt(end: number, isAsc: boolean | null): Promise<string[]> {
    let clicks: string[] = [];
    // TODO
    // TODO
    return clicks;
}

interface ISetTimeForDateProps {
    date: Date;
    hour: number;
    minute: number; 
    second: number; 
}

function setTimeForDate(dateObj: Date, hour: number, minute: number, second: number): Date {
    const date = new Date(dateObj); 
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    date.setMilliseconds(0); 
    return date;
}

export async function getClickstreamOnDate(date: Date, isAsc: boolean): Promise<any[] | any> {
    let dateObj = new Date(date);
    let dateStart = setTimeForDate(dateObj, 0, 0, 0); 
    let timestampStart = dateStart.getTime();
    
    let dateEnd = setTimeForDate(dateObj,23,59,59); 
    let timestampEnd = dateEnd.getTime();
    // let tsEndDate = new Date(timestampEnd).toLocaleString()

    return await getDoubleEndedClickstream(timestampStart, timestampEnd, isAsc); 
}

export async function getDoubleEndedClickstream(start: number, end: number, isAsc: boolean | null): Promise<any[]> {
    let clicksInRange: any[] = [];
    const lexResults = await redis.zrangebylex('clickstream.chronological', `[${start}`, `(${end}`);
    
    lexResults.forEach(function(value: string, index: number) {
        let fragments = value.split(':'); 

        clicksInRange.push({
            id: index,
            cfRay: fragments[1],
            click: fragments[2], 
            timestamp: fragments[0],
            localDatetime: `${new Date(parseInt(fragments[0])).toLocaleString()}`,
        }); 
    })
    return clicksInRange
}
