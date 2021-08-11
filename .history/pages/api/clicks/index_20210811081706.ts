import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import getHandler from '../../../lib/api/helpers'


export default getHandler()
    .get(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'GET /clicks'});
    })
    .post(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'POST /clicks' });
    })
    .put(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'PUT /clicks' });
    })
    .delete(async (_: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: 'DELETE /clicks' });
    }); 

