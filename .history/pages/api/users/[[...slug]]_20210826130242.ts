import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import {
    getViewsForUser,
    getClickstreamForUser,
    getUniqueVisitorsForUser,
    getFrequenciesByCategoryForUser,
    formatUniques
} from '../../../lib/redis/users'

import { 
    ScoredSlug,
    formatAndSortSlugs 
} from '../../../lib/utils/formatters'

// import * as d3 from 'd3'
import * as Promise from "bluebird"
import redis from '../../../lib/redis/index'

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
    .get('/api/users/:email/rankings/frequencies', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.email

        if(email) {
            try {
                const { rankingsByFreq, category } = await getUniqueVisitorsForUser(email)

                res.status(200).json({ 
                    frequency: rankingsByFreq,
                    category,
                }); 
            } catch(error) {
                res.status(500).json({ error: `${error.message}` })
            }
        } else {
            res.status(403).json({ error: 'BAD REQUEST INVALID EMAIL' });
        }
    })
     .get('/api/users/:email/rankings/uniques', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.email

        if(email) {
            const uniques = await getViewsForUser(email)
            
            let promises: Promise[] = [];
            let uniqueMap: any = {}
            uniques.map((uniqueSlug: string, _: number) => {
                promises.push(new Promise(function(resolve: any, reject: any) {  
                        redis.zrange(`ip.by.slug.${uniqueSlug}`, 0, -1, 'WITHSCORES')
                        .then((response: any) => {
                            return resolve(uniqueMap[uniqueSlug] = formatUniques(response)) 
                        }).catch((error: any) => {
                            return reject(new Error(`${error.message}`)) 
                        });
                    })
                );
            });

            Promise.all(promises)
            .then((_: any)  => res.status(200).json({ uniques: uniqueMap }))
            .catch((error: any) => res.status(500).json({ error: `${error.message}`}));
        } else {
            res.status(403).json({ error: 'BAD REQUEST' })
        }
    })
    .get('/api/users/:user/frequencies', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.user

        if(email) {
            let categories: string[] = ['browser', 'os', 'engine', 'httpProtocol', 'tlsVersion', 'country', 'label'];
            let promises: Promise[] = [];
            let uniqueMap: any = {};

            categories.map((category: string, _: number) => {
                promises.push(new Promise(function(resolve: any, reject: any) {
                    redis.zrange(`${category}.by.user.${email}`, 0, -1, 'WITHSCORES')
                    .then((response: any) => {
                        let frequencies: string[] = response;
                        // let rankings: ScoredSlug[] = formatAndSortSlugs(frequencies); 
                        return resolve(uniqueMap[category] = [...rankings]);
                    })
                    .catch((error: any) => {
                        return reject(new Error(`${error.message}`));
                    });
                }))
            });

            Promise.all(promises)
            .then((_: any) => res.status(200).json({ frequencies: uniqueMap }))
            .catch((error: any) => res.status(500).json({ error: `${error.message}` }));
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


