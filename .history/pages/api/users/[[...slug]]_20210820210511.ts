import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import {
    getViewsForUser,
    getClickstreamForUser,
    getUniqueVisitorsForUser,
    getFrequenciesByCategoryForUser,
} from '../../../lib/redis/users'
import { 
    getUniqueVisitorsFromSlugs 
} from '../../../lib/redis/slugs'

import * as d3 from 'd3'

const validCategories: any = {
    "tlsVersion": true,
    "httpProtocol": true,
    "browser": true,
    "engine": true,
    "os": true,
    "country": true,
    "ip": true,
};

export default getHandler()
    .get('/api/users/:user/seen', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.user

        if(email) {
            const userSlugs = await getViewsForUser(email);
            res.status(200).json({ 
                slugs: userSlugs, 
                email 
            }); 
        } else {
            res.status(403).json({ error: 'BAD REQUEST INVALID EMAIL' });
        }
    })
    .get('/api/users/:user/views', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.user

        if(email) {
            const clickstream: any[] = await getClickstreamForUser(email);
            res.status(200).json({ 
                clickstream, 
                count: clickstream.length,
                email
            });
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_SLUG' })
        }
    })
    .get('/api/users/:user/uniques', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.user

        if(email) {
            const userSlugsWithScores = await getUniqueVisitorsForUser(email);
            const clickstream = await getClickstreamForUser(email);
            const clickstreamGroupedBySlugs = d3.group(clickstream, click: any => click.slug);

            res.status(200).json({ 
                userUniques: userSlugsWithScores.rankings.reverse(), 
                category: userSlugsWithScores.category,
                firsts: userSlugsWithScores.firsts,
                clickstream: clickstreamGroupedBySlugs,
            }); 
        } else {
            res.status(403).json({ error: 'BAD REQUEST INVALID EMAIL' });
        }
    })
    .get('/api/users/:user/frequencies/:filter', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.user
        const category: string = req.params.filter

        if(email) {
            if (category && validCategories[category]===true) {  
                const categoryWithScores = await getFrequenciesByCategoryForUser(email, category);
                res.status(200).json({ 
                    categoryFrequencies: categoryWithScores.rankings,
                    category: categoryWithScores.category,
                    email
                 });
            } else {
                res.status(403).json({ error: 'INVALID FILTER' })
            }
        } else {
            res.status(403).json({ error: 'BAD REQUEST INVALID EMAIL' });
        }
    });