import redis from './index'
import parser from 'ua-parser-js'

import { getUserResponses } from './users'

interface UncachedDetailsProps {
    owner: string;
    slug: string; 
    os: string;
    browser: string;
    engine: string;
    ip: string; 
    country: string; 
    tlsVersion: string;
    httpProtocol: string;
}; 

interface CacheResults {
    results: any[];
    successes: number;
}

export async function calibrateCache(): Promise<CacheResults> {
    let results: any[] = []; 
    let successes: number = 0;

    const clickstream = await redis.lrange(`clickstream`, 0, -1);

    if(clickstream?.length) {
        clickstream.map(async (click: any, index: number) => {

            let clickInfo = JSON.parse(click);

            const ua = parser(clickInfo.requestHeaders.system)
            const os: string = ua.os.name || "undefined"
            const engine: string = ua.engine.name || "undefined"
            const browser: string = ua.browser.name  || "undefined"
            const ip: string = clickInfo.requestHeaders.ip || "undefined"
            const country: string = clickInfo.requestHeaders.country  || "undefined"
            const tlsVersion: string = clickInfo.requestHeaders.tlsVersion || "undefined"
            const httpProtocol: string = clickInfo.requestHeaders.httpProtocol || "undefined"

            console.log(`${index}: ${os} | ${engine} | ${browser} | ${ip} | ${country} | ${tlsVersion} | ${httpProtocol} | ${httpProtocol}`);
         
            let uncachedInfo: UncachedDetailsProps = { 
                owner: clickInfo.owner,
                slug: clickInfo.slug, 
                ip,
                country,
                tlsVersion,
                httpProtocol,
                browser,
                engine,
                os 
            };

            const didUpdate: boolean = await updateCache({ ...uncachedInfo });
            results.push(didUpdate);
            ++successes; 
        });
    }
    return { 
        results, 
        successes 
    }; 
}

export async function cacheResponseHeaders(email: string) {
    const responseFields: any[] = [];
    const responseHeaders = await getUserResponses(email)
    const cacheStatusFreqs = {};

    responseHeaders.map((responseHeader, _) => {
        const cacheStatus: string = responseHeader['x_cache'] || responseHeader['cf_cache_status'] || 'N/A'
        const responseTime = responseHeader['responseTime'] || 'N/A'
        const responseStatus = responseHeader['responseStatus'] || 'N/A'
        // const cfCacheStatus=  || 'N/A'
        const cacheControl = responseHeader['cacheControl'] || 'N/A'
        const contentType = responseHeader['content_type'] || 'N/A'
        const server = responseHeader['server'] || 'N/A'
        const destination = responseHeader['destination'] || 'N/A'

        if(!cacheStatusFreqs[cacheStatus]) {
            cacheStatusFreqs[cacheStatus] = 0;
        }
        cacheStatusFreqs[cacheStatus]++

        responseFields.push({ 
            cacheStatus, 
            responseTime, 
            cacheControl,
            responseStatus, 
            // cfCacheStatus, 
            contentType, 
            server, 
            destination 
        }); 
    });

    return { cacheStatusFreqs };
}


 async function updateCache({ 
     owner, 
     slug, 
     ip, 
     country, 
     tlsVersion, 
     httpProtocol, 
     browser, 
     engine, 
     os 
}: UncachedDetailsProps): Promise<boolean> {

     try {
         const multiPromise = await redis.multi()
         .zincrby(`ip.by.user.${owner}`, 1, ip)
         .zincrby(`country.by.user.${owner}`, 1, country)
         .zincrby(`tlsVersion.by.user.${owner}`, 1, tlsVersion)
         .zincrby(`httpProtocol.by.user.${owner}`, 1, httpProtocol)
         .zincrby(`browser.by.user.${owner}`, 1, browser)
         .zincrby(`os.by.user.${owner}`, 1, os)
         .zincrby(`engine.by.user.${owner}`, 1, engine)
         .zincrby(`ip.by.slug.${slug}`, 1, ip)
         .zincrby(`country.by.slug.${slug}`, 1, country)
         .zincrby(`tlsVersion.by.slug.${slug}`, 1, tlsVersion)
         .zincrby(`httpProtocol.by.slug.${slug}`, 1, httpProtocol)
         .zincrby(`browser.by.slug.${slug}`, 1, browser)
         .zincrby(`os.by.slug.${slug}`, 1, os)
         .zincrby(`engine.by.slug.${slug}`, 1, engine)
         .exec((err: any, result: any[]) => { 
             console.log(JSON.stringify(result)); 
         });
         return Promise.resolve(true);
     } catch (error) {
         console.log(`${error.message}`);
         return Promise.reject(false);
     }
}