import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import _ from '../../../../Library/Caches/typescript/4.3/node_modules/@types/lodash';

const handler = nc()
    .get((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'GET /todos'});
    })
    .post((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'POST /todos' });
    })
    .put((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'PUT /todos' });
    })
    .delete((_: NextApiRequest, res: NextApiResponse) => {
        res.json({ message: 'DELETE /todos' });
    }); 