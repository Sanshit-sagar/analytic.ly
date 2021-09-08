import { NextApiResponse } from 'next'

import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    getAllUrchinsForUser, 
    addUrchinPairForUser 
} from '../../../lib/redis/urchins'


// ADD: GET /api/seo/user/:email/[all, recent, top/[source, medium,term,campaign, all/*]

export default getHandler()
    .get('/api/urchins/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            const userUrchins = await getAllUrchinsForUser(email)
        }
    });