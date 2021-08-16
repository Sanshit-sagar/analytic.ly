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

export async function getClickstreamOnDate(date: Date, isAsc: boolean): Promise<any[]> {
    let dateObj = new Date(date);
    dateObj.setHours(0);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    let timestampStart = dateObj.getTime();

    dateObj.setHours(23);
    dateObj.setMinutes(59);
    dateObj.setSeconds(59)
    let timestampEnd = dateObj.getTime();

    // return `Getting clicks from ${new Date(timestampStart).toLocaleString()} to ${new Date(timestampEnd).toLocaleString()}`
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
