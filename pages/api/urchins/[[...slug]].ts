import { NextApiResponse } from 'next'

import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    addUrchinForUser,
    deleteUrchinForUser,
    getAllUrchinsForUser, 
    getUrchinsForUser
} from '../../../lib/redis/urchins'

// import { requireSession, WithSessionProp } from '@clerk/nextjs/api'
// const BAD_REQUEST_INVALID_URCHIN_KEY = 'Bad Request, invalid utm field.'
// const VALID_URCHIN_KEYS = 'Valid Keys: Term, Source, Medium, Campaign, Content' 
const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, invalid e-mail provided.'
const BAD_REQUEST_EMPTY_URCHIN_VALUE = 'Bad Request, no utm value provided.'
const DELETE_SUCCESS = 'Successfully deleted'
const DELETE_FAILURE = 'Uh Oh, could not find/delete'


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
                    const results: IUrchin[] = await getUrchinsForUser(email, category)
                    res.status(200).json({ 
                        count: results?.length ?? 0,
                        previous: undefined,
                        next: undefined,
                        results,
                    })
                } catch (error) {
                    res.status(500).json({ error })
                }
            }
            else {
                res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
            }
    })
    .post('/api/urchins/user/:email/:key/:value',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email
        const key = req.params.key
        const value= req.params.value

        if(!email) {
            res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
        } if(!key || !value) {
            res.status(403).json({ error: BAD_REQUEST_EMPTY_URCHIN_VALUE })
        } else {
            try {
                // TODO: add a check for and return an error if the new value already exists
                const data = await addUrchinForUser(email, key, value)
                res.status(200).json({ 
                    data, 
                    input: { 
                        key, 
                        value 
                    },
                    operation: 'New Urchin'
                })
            } catch(error) {
                res.status(500).json({ error })
            }
        }
    }) 
    .delete('/api/urchins/user/:email/:key/:value', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email
        const key = req.params.key
        const value= req.params.value
        
        if(!email) {
            res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
        } if(!key || !value) {
            res.status(403).json({ error: BAD_REQUEST_EMPTY_URCHIN_VALUE })
        } else {
            try {
                // TODO: Add DeleteAndRetrieve() or chain the delete promise with
                // a getUrchinsForUser() call to return the updated group of urchins after deletion
                const didDelete: boolean = await deleteUrchinForUser(email, key, value)
                res.status(200).json({ 
                    data: didDelete, 
                    message: `${didDelete ? DELETE_SUCCESS : DELETE_FAILURE} ${value} from ${key} for ${email}`,
                    input: { 
                        key, 
                        value 
                    }, 
                    operation: 'Delete Urchin',
                });
            } catch(error) {
                res.status(500).json({ error })
            }
        }
    });