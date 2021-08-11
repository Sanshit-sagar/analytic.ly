import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc()
    .get((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'GET /clicks'});
    })
    .post((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'POST /clicks' });
    })
    .put((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'PUT /clicks' });
    })
    .delete((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'DELETE /clicks' });
    }); 

export default handler; 