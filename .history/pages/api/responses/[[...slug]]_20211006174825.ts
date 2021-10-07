import { NextApiResponse } from 'next'
import getHandler, { NextApiRequestExtended } from '../../../lib/utils/helpers'
import {
    getUserResponses
} from '../../../lib/redis/users'
import {
    cacheResponseHeaders
} from '../../../lib/redis/admin'

import { min, max, mean, median } from 'd3-array'

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
}

// minIndex: minIndex(data),
// maxIndex: maxIndex(data),
// mean: mean(data),
// mode: mode(data),
// median: median(data),
//     minIndex: Nullable<T>;
//     maxIndex:  Nullable<T>;
//     mean: Nullable<T>;
//     mode:  Nullable<T>;
//     median: Nullable<T>; 
// }

const extract = (payloads: ResponsePayload[], property: keyof ResponsePayload): Nullable<number>[] => {
    return payloads.map((payload: ResponsePayload, i: number) => {
        return  payload.hasOwnProperty(property) 
                ?   parseInt(`${payloads[i][property]}`) 
                :   undefined
    })
}

function tldr(untypedData: number[]): SummaryStats<number> {
    let data: number[] = untypedData.map(ud => +ud);
    
    return {
        min: min(data),
        max: max(data),
        mean: mean(data),
        median: median(data),
        
    }
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
            const data = extract(responses, 'responseTime') 
            const stats = tldr(data)
            res.status(200).json({ data, stats })
        } catch(error: CaughtErrorOrException) {
            res.status(500).json({ error: error.message })
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


        

