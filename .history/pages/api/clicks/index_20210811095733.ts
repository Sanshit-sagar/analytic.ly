import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/api/helpers'
var parser = require('ua-parser');

import getHandler from '../../../lib/api/helpers'
import redis from '../../../lib/redis'

function formatSlugs(unformattedSlugs: any[]) {
    let userslugs: any[] = []; 

    unformattedSlugs.map(function(value: any, index: number) {
        let sluginfo = JSON.parse(value);
        userslugs.push({
            slug: sluginfo,
            index,
        });
    });

    return userslugs; 
}

interface IUserAgent {
    browser: string,
    engine: string,
    os: string,
};


export function formatUserAgent(useragent: string): IUserAgent {
    if(!useragent)
    
    var ua = parser(useragent);

    return {
        'browser': !useragent?.length ? '' : ua.browser?.name || '-',
        'engine': !useragent?.length ? '' : ua.engine.name || '-',
        'os': !useragent?.length ? '' : ua.os.name || '-',
    };
}


export default getHandler()
    .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let username = req.name;
        let useremail = req.email;
        
        let userslugs: any[] = [];

        const userslugsRaw = await redis.lrange(`clickstream.user.${useremail}`, 0, -1);
        userslugs = formatSlugs(userslugsRaw);
       
        

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

