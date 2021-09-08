import { NextApiResponse } from 'next'

import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    isValidUtm,
    getAllUrchinsForUser, 
    addUrchinPairForUser 
} from '../../../lib/redis/urchins'

const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, invalid e-mail provided.'
const BAD_REQUEST_INVALID_URCHIN_KEY = 'Bad Request, invalid utm field.'
const BAD_REQUEST_EMPTY_URCHIN_VALUE = 'Bad Request, no utm value provided.'

const VALID_URCHIN_KEYS = 'Valid Keys: Term, Source, Medium, Campaign, Content' 
// ADD: GET /api/seo/user/:email/[all, recent, top/[source, medium,term,campaign, all/*]

export default getHandler()
    .get('/api/urchins/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const userUrchins = await getAllUrchinsForUser(email);
                res.status(200).json({ userUrchins })
            } catch(error) {
                res.status(500).json({ error })
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }
    })
    .post('/api/urchins/user/:email/:urchinKey/:urchinValue',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email
        const urchinKey = req.params.urchinKey
        const urchinValue= req.params.urchinValue

        if(!email) {
            res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
        } else if(!urchinValue) {
            res.status(403).json({ error: BAD_REQUEST_EMPTY_URCHIN_VALUE })
        } else if(!isValidUtm(urchinKey)) {
            res.status(403).json({ error: `${BAD_REQUEST_INVALID_URCHIN_KEY}: ${urchinKey}. ${VALID_URCHIN_KEYS}` })
        } else {
            try {
                const addUrchinPairForUser
            }
        }

    });