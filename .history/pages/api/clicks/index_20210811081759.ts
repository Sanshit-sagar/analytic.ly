import { NextApiRequest, NextApiResponse } from 'next'
import getHandler from '../../../lib/api/helpers'

export default getHandler()
    .get(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'GET /clicks - Authenticated'});
    })
    .post(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'POST /clicks - Authenticated' });
    })
    .put(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'PUT /clicks - Authenticated' });
    })
    .delete(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'DELETE /clicks - Authenticated' });
    }); 

