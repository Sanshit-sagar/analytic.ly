import { NextApiResponse } from 'next'
import getHandler, { NextApiRequestExtended } from '../../../lib/utils/helpers'
import {
    getUserResponses
} from '../../../lib/redis/users'
import {
    cacheResponseHeaders
} from '../../../lib/redis/admin'

const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, No email provided'

export default getHandler()
    .get('/api/responses/user/:email/all', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const allResponses = await getUserResponses(email);
                res.status(200).json({ allResponses })
            } catch (error) {
                res.status(500).json({ error: `${error.message}` })
            }
        } else {
            res.status(500).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }
    })
    .get('/api/responses/user/:email/responseTimes', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const responseTimes = await cacheResponseHeaders(email)
                console.log(`Response Fields--- ${JSON.stringify(responseTimes)}`);
                
                res.status(200).json({ responseTimes })
            } catch(error) {
                res.status(500).json({ error: `${error.message}` })
            }
        } else {
            res.status(500).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }
    })


        
