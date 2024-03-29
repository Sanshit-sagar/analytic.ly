import { NextApiResponse } from 'next'
import getHandler, { NextApiRequestExtended } from '../../../lib/utils/helpers'
import {
    getUserResponses
} from '../../../lib/redis/users'
import {
    cacheResponseHeaders
} from '../../../lib/redis/admin'
import { generateVoronoi } from '../../../lib/redis/users'
import { min, max, mean, median, variance, deviation, zip, group } from 'd3-array'

type CaughtErrorOrException = Error | any | null; 

interface ResponsePayload {
    cfRay: string;
    slug: string;
    destination: string;
    age: string;
    cache_control: string;
    cf_cache_status?: string;
    cf_ray?: string;
    connection?: string;
    content_security_policy?: string;
    content_type?: string;
    date?: string // Date
    expect_ct: string;
    last_modified: string;
    server: string;
    strict_transport_security: string;
    transfer_encoding: string; 
    vary: string;
    via: string; 
    x_amz_cf_id: string;
    x_amz_cf_pop: string;
    x_cache: string; 
    x_content_type_options: string; 
    x_frame_options: string; 
    x_xss_protection: string;
    responseTime: number;
    timestamp: string; 
}

type Nullable<T> = T | undefined

type SummaryStats<T> = {
    min: Nullable<T>;
    max: Nullable<T>;
    mean: Nullable<T>;
    median: Nullable<T>; 
    variance: Nullable<T>;
    deviation: Nullable<T>;
}

function UndefinedStatsFactory<T>(): SummaryStats<T> {
    return { 
        min: undefined, 
        max: undefined, 
        mean: undefined, 
        variance: undefined, 
        median: undefined, 
        deviation: undefined 
    }
}

const extract = (payloads: ResponsePayload[], property: keyof ResponsePayload) => {
    return payloads.map((payload: ResponsePayload, i: number) =>  (
            typeof property === 'number'    
        ?   payload.hasOwnProperty(property) ?             parseInt(`${payloads[i][property]}`)               :   undefined    
        :   payload.hasOwnProperty(property) ?  new Date(  parseInt(`${payloads[i][property]}`) ).getTime()   :   undefined
    ))
}

function tldr(untypedData: (Nullable<number> | Nullable<string>)[]): SummaryStats<number | string> {

    let data: number[] = untypedData.map((ud: Nullable<number> | Nullable<string>) => !ud ? 0 : +ud)
    
    return {
        min: min(data),
        max: max(data),
        mean: mean(data),
        median: median(data),
        variance: variance(data),
        deviation: deviation(data)
    }
}

function extractZipAndSummarize(payload: ResponsePayload[]) {
    const times = extract(payload, 'responseTime') 
    const dates = extract(payload, 'timestamp') 
    const stats = tldr(times)
    const data = zip(times, dates)

    return { data, stats, message: 'hi' }
}

export default getHandler()
    .get('/api/responses/user/:email/all', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const allResponses = await getUserResponses(email);
                res.status(200).json({ allResponses })
            } catch (error: Error | any | null) {
                res.status(500).json({ error: `${error?.message || ''}` })
            }
        } else {
            res.status(500).json({ error: 'Invalid email' })
        }
    })
    .get('/api/responses/user/:email/times', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        try {
            const responses = await getUserResponses(email)
            const { data, stats } = extractZipAndSummarize(responses)
            res.status(200).json({ data, stats })
        } catch(error: CaughtErrorOrException) {
            res.status(500).json({ error: error.message })
        }
    })
    .get('/api/responses/user/:email/calendar', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        try {
            const voronoi = await generateVoronoi(email); 
            const v = voronoi.map((vrn) => {
                return {
                    slug: vrn.slug,
                    day: vrn.dayOfYear,
                    
                }
            })
        
            const data = Array.from(group([...voronoi.points], (d) => d.slug))
           
            if(voronoi) {
                res.status(200).json({ data })
            } else {
                res.status(403).json({ error: 'NO_MATCHES_FOUND' })
            }
        } catch(error: CaughtErrorOrException) {
            res.status(500).json({ error })
        }
    })
    .get('/api/responses/user/:email/cache', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const data = await cacheResponseHeaders(email)
                
                res.status(200).json({ data, resource: 'Forwarded Response', collection: 'Cache Headers' })
            } catch(error) {
                res.status(500).json({ error })
            }
        } else {
            res.status(500).json({ error: 'Invalid email' })
        }
    })


        

