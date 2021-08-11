import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/api/helpers'


import getHandler from '../../../lib/api/helpers'
import redis from '../../../lib/redis'


export default getHandler()
    .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let username = req.name;
        let useremail = req.email;
        let userslugs: any[] = [];

        const userslugsRaw = await redis.lrange(`clickstream.user.${useremail}`, 0, -1);
        console.log(`About to retrieve slugs`);
        userslugsRaw.map(function(value: any, index: number) {
            let sluginfo = JSON.parse(value);
            userslugs.push({
                index,
                ...sluginfo
            });
        });
        console.log(`Returning ${userslugs.length} user slugs`)

        res.status(200).json({ 
            message: 'GET /clicks - Authenticated',
            user: `${username}, ${useremail}`,
            slugs: [...userslugs]
        });
    })
    .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'POST /clicks - Authenticated' });
    })
    .put(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'PUT /clicks - Authenticated' });
    })
    .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(405).json({ message: 'Delete is not allowed for /clicks' });
    }); 

