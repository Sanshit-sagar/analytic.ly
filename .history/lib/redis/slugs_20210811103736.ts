import redis from './index'
import { 
    formatSlug,
    formatCoordinate, 
    formatLocation, 
    formatTimestamp 
} from '../utils/formatters';

export function formatSlugs(unformattedSlugs: any[]): any[] {
    let userslugs: any[] = []; 

    unformattedSlugs.map(function(value: any, index: number) {
        let sluginfo = JSON.parse(value);
        userslugs.push({
            slug: formatSlug(sluginfo.slug),
            views: formatSlug(sluginfo.slug), // slug passed as args to views col SWR hook
            geodata: formatCoordinate(sluginfo.geodata.longitude, sluginfo.geodata.latitude),
            location: formatLocation(sluginfo.geodata.city, sluginfo.geodata.postalCode, sluginfo.geodata.timezone),
            timestamp: formatTimestamp((sluginfo.timestamp)['datetime']),
            destination: sluginfo.destination,
            ipAddress: sluginfo.visitor.ip,
            tlsVersion: sluginfo.misc.tlsVersion || sluginfo.tlsVersion ||  '',
            httpProtocol: sluginfo.misc.httpProtocol || sluginfo.httpProtocol || '',
            asn: sluginfo.misc.asn || sluginfo.asn || '',
            extras: {
                host: sluginfo.visitor.host,
                realIp: sluginfo.visitor.realIp,
                forwardedFor: sluginfo.visitor.forwardedFor,

            }
        });
    });

    return userslugs; 
}

export async function getClicksForUser(email: string): Promise<any[]> {
    const userslugsRaw: any[] = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    return formatSlugs(userslugsRaw);
}
