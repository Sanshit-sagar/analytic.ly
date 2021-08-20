import redis from './index'
import parser from 'ua-parser-js'

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