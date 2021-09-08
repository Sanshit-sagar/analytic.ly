import { NextApiResponse } from 'next'

import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    getAllUrchinsForUser, 
    addUrchinPairForUser 
} from '../../../lib/redis/urchins'

const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, invalid e-mail provided'
// ADD: GET /api/seo/user/:email/[all, recent, top/[source, medium,term,campaign, all/*]

export default getHandler()
    .get('/api/urchins/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const userUrchins = await getAllUrchinsForUser(email);
            } catch(error) {
                res.status(500).json({ error })
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }
    });