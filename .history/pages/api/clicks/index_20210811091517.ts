import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/api/helpers'


import getHandler from '../../../lib/api/helpers'
import redis from '../../../lib/redis'


export default getHandler()
    .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let username = req.name;
        let useremail = req.email;
        let timestamp = new Date().getTime(); 

        res.status(200).json({ 
            message: 'GET /clicks - Authenticated',
            user: `${username}, ${useremail} @ ${timestamp}`
        });
    })
    .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'POST /clicks - Authenticated' });
    })
    .put(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'PUT /clicks - Authenticated' });
    })
    .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'DELETE /clicks - Authenticated' });
    }); 

