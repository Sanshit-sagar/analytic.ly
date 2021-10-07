import { NextApiResponse } from 'next'
import getHandler, { NextApiRequestExtended } from '../../../lib/utils/helpers'
import {
    getUserResponses
} from '../../../lib/redis/users'
import {
    cacheResponseHeaders
} from '../../../lib/redis/admin'

const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, No email provided'

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
    responseTime: number;
    responseStatus: number;
    timestamp: string; 
}

function extract(payloads: ResponsePayload[], field: string) {
    return payloads.map((payload, i) => {
        return Number(payload[`${field}`])
    })
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
            res.status(500).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }
    })
    .get('/api/responses/user/:email/time', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        try {
            const allResponses = await getUserResponses(email)
            const data = extract(allResponses, 'responseTime') 
            res.status(200).json({ 
                data, 
                resource: 'Clicks',
                collection: 'Response Times'
            })
        } catch(error: Error | any | null) {
            console.error(error?.message ?? 'Unknown error')
            res.status(500).json({ error })
        }
    })
    .get('/api/responses/user/:email/cache', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const responseTimes = await cacheResponseHeaders(email)
                
                res.status(200).json({ responseTimes })
            } catch(error) {
                res.status(500).json({ error: `${error.message}` })
            }
        } else {
            res.status(500).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }
    })


        

