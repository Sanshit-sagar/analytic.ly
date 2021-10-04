import { NextApiResponse } from 'next'

import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    isValidUtm,
    getAllUrchinsForUser, 
    addUrchinPairForUser,
    getUrchinsForUserForCategory
} from '../../../lib/redis/urchins'

// import { requireSession, WithSessionProp } from '@clerk/nextjs/api'

const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, invalid e-mail provided.'
const BAD_REQUEST_INVALID_URCHIN_KEY = 'Bad Request, invalid utm field.'
const BAD_REQUEST_EMPTY_URCHIN_VALUE = 'Bad Request, no utm value provided.'

const VALID_URCHIN_KEYS = 'Valid Keys: Term, Source, Medium, Campaign, Content' 

export interface IUrchin { 
    id: string; 
    name: string; 
    frequency: number; 
    updatedAt: Date; 
};

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
    .get('/api/urchins/user/:email/:cateogry', async (req: NextApiRequestExtended, res: NextApiResponse) => {
            const email = req.params.email
            const category = req.params.cateogry

            if(email) {
                try {
                    const results: IUrchin[] = await getUrchinsForUserForCategory(email, category)
                    res.status(200).json({ 
                        count: results?.length ?? 0,
                        previous: undefined,
                        next: undefined,
                        results,
                    });
                } catch (error) {
                    res.status(500).json({ error })
                }
            }
            else {
                res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
            }
    })
    .post('/api/urchins/new/:category/:newUrchin',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = 'sanshit.sagar@gmail.com'
        const category = req.params.category
        const value= req.params.newUrchin

        
        if(!category || !value) {
            res.status(403).json({ error: BAD_REQUEST_EMPTY_URCHIN_VALUE })
        } else {
            try {
                const result = await addUrchinPairForUser(email, category, value)
                res.status(200).json({ 
                    data: result, 
                    input: { 
                        category, 
                        urchin: value 
                    },
                })
            } catch(error) {
                res.status(500).json({ error })
            }
        }
    });