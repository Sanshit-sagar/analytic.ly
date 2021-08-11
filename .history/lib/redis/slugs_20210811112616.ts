var parser = require('ua-parser-js');
import redis from './index'

import { 
    formatSlug,
    formatCoordinate, 
    formatLocation, 
    formatTimestamp 
} from '../utils/formatters';

interface IUserAgent {
    browser: string,
    engine: string,
    os: string,
};

export function formatUserAgent(useragent: string): IUserAgent {
    var ua = useragent?.length ? parser(useragent) : '';

    return {
        'browser': useragent?.length ? ua.browser?.name : '',
        'engine': useragent?.length ? ua.engine.name : '',
        'os': useragent?.length ?  ua.os.name : '',
    };
}

export function formatAndSortSlugs(unformattedSlugs: any[]): any[] {
    let userslugs: any[] = []; 

    unformattedSlugs.map(function(value: any, index: number) {
        let sluginfo = JSON.parse(value);
        let fmtUa = formatUserAgent(sluginfo.visitor.system);

        userslugs.push({
            slug: formatSlug(sluginfo.slug),
            destination: sluginfo.destination,
            timestamp: Object.values(formatTimestamp((sluginfo.timestamp)))[2], // { localeTime: "8/5/2021, 6:04:52 AM", timeAgo: millis }
            views: formatSlug(sluginfo.slug), // slug passed as args to views col SWR hook
            os: fmtUa['os'], 
            engine: fmtUa['engine'],
            browser: fmtUa['browser'],
            country: sluginfo.geodata.country,
            location: formatLocation(sluginfo.geodata.city, sluginfo.geodata.postalCode, sluginfo.geodata.timezone),
            metroCode: sluginfo.geodata.metroCode,
            geodata: formatCoordinate(sluginfo.geodata.longitude, sluginfo.geodata.latitude),    
            ipAddress: sluginfo.visitor.ip,
            host: sluginfo.visitor.host,
            tlsVersion: sluginfo.misc.tlsVersion || sluginfo.tlsVersion ||  '',
            httpProtocol: sluginfo.misc.httpProtocol || sluginfo.httpProtocol || '',
            asn: sluginfo.misc.asn || sluginfo.asn || '',
            tlsCipher: sluginfo.misc.tlsCipher || sluginfo.tlsCipher || '',
            clientTcpRtt: sluginfo.misc.clientTcpRtt || sluginfo.clientTcpRtt || '',
            clientAcceptEncoding: sluginfo.misc.clientAcceptEncoding || sluginfo.clientAcceptEncoding || '',
            extras: {
                realIp: sluginfo.visitor.realIp,
                forwardedFor: sluginfo.visitor.forwardedFor,
            },
        });
    });

    userslugs.sort((a,b) => b.id - a.id);
    return userslugs; 
}

export async function getClicksForUser(email: string): Promise<any[]> {
    const userslugsRaw: any[] = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    return formatAndSortSlugs(userslugsRaw);
}
