import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

import { getViewsForSlug } from '../../../lib/redis/slugs'
import { getViewsForUser } from '../../../lib/redis/users'
import { getDoubleEndedClickstream } from '../../../lib/redis/clicks'
import { getTicksInRange, getRangeBoundaries } from '../../../lib/utils/d3time'
import { merge } from  '../../../lib/utils/mergers'

interface Click {
    id: string; 
    cfRay: string; 
    timestamp: number; 
    slug: string; 
    user: string;
};

interface Partition {
    [key: string]: Click[];
}; 

type Range = {
    start: number;
    end: number; 
};

type BoundedClickstream = {
    views: Click[];
    minTimestamp: number;
    maxTimestamp: number;
}

interface ClickstreamDetails {
    clickstream: Click[];
    partitions: Partition[];
    timestampsDomain: Range; 
    partitionsDomain: Range;
    partitionCount: number;
    clickCount: number; 
}

interface RawClickstream {
    views: Click[];
    minTimestamp: number;
    maxTimestamp: number;
    amount: number;
    range: string;
    interval: string;
}

function getUserDetails(user: any) {
    return {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        image: user.imageUrl,
        lastUpdatedAt: user.lastUpdatedAt,
        accounts: [],
    }; 
}

function UnknownErrorFactory(error: Error | any | null, slug: string) {
    let failureStr = `Couldn't format clickstream for slug: ${slug}.`
    let errorMsg = `Error: ${error?.message || ''}`

    return error ? `${failureStr}${errorMsg}` : `${failureStr}`
}

// function getRawClickstream(slug: string): Promise<BoundedClickstream> {
//     let p: Promise<BoundedClickstream> = new Promise((resolve, reject) => {
//         getDoubleEndedClickstream(0, -1, slug, 'slug', true)
//             .then((clickstream: BoundedClickstream) => {
//                 resolve(clickstream)
//             }).catch((error: Error | null) => {
//                 reject(new Error(`Encountered an error: ${error?.message || ''}`))
//             })
//     });
//     return p;
// }


// function getFormattedClickstream(slug: string, amount: number, interval: string, range: string): Promise<ClickstreamDetails> {
    
//     return Promise.resolve(getRawClickstream(slug))
//         .then((clickstream: BoundedClickstream) => {
//             const boundaries: number[] = getRangeBoundaries(amount, range, interval)
//             const ticksInRange: number[] = getTicksInRange(boundaries[0], boundaries[1], interval, interval)

//             const { 
//                 mergedIntervals, 
//                 viewsByIntervals, 
//                 bounds, 
//                 numPeriods, 
//                 numClicks 
//             } = merge(clickstream.views, boundaries, ticksInRange, interval)

//             return {
//                 clickstream: mergedIntervals,
//                 partitions: viewsByIntervals,
//                 timestampsDomain: { 
//                     start: clickstream.minTimestamp,
//                     end: clickstream.maxTimestamp
//                 },
//                 partitionsDomain: {
//                     start: bounds[0],
//                     end: bounds[1],
//                 },
//                 partitionCount: numPeriods,
//                 clickCount: numClicks
//             }
//         })
//         .catch((error) => {
//             console.error(error)
//             throw new Error(UnknownErrorFactory(error, slug))
//         })
// }

interface FormatedClickstreamProps {
    slug: string, 
    amount: number, 
    range: string, 
    interval: string
};

const getFormattedClickstream = async ({
    slug, 
    amount,
    range, 
    interval,
}: FormatedClickstreamProps): Promise<ClickstreamDetails> => {
    try {
        const { views, minTimestamp, maxTimestamp } = await getDoubleEndedClickstream(0, -1, slug, 'slug', true);
        const boundaries: number[] = getRangeBoundaries(amount, range, interval); 
        const ticksInRange: number[] = getTicksInRange(boundaries[0], boundaries[1], interval, interval);
        const { mergedIntervals, viewsByIntervals, bounds, numPeriods, numClicks } = merge(views, boundaries, ticksInRange, interval); 

        return {
            clickstream: mergedIntervals,
            partitions: viewsByIntervals,
            timestampsDomain: { 
                start: minTimestamp,
                end: maxTimestamp
            },
            partitionsDomain: {
                start: bounds[0],
                end: bounds[1],
            },
            partitionCount: numPeriods,
            clickCount: numClicks
        }
    } catch(error: any | null) {
        throw new Error(error || 'Unknown error occured')
    }
}

function ResourceDataFactory(resourceId: string, user: string, resource: string, collection: string) {
    return {
        user,
        resource,
        resourceId,
        collection,
        timestamp: new Date().getTime()
    }
}

const isSlugVisited = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        const views: number = await getViewsForSlug(slug)

        if(views > 0) {
            resolve(`${views} views`)
        } else {
            reject(new Error(`slug has not had any visitors yet`)
        }
    });
}

const isSlugOwnedByUser = async (slug: string, email: string) => {
    return new Promise(async (resolve, reject) => {
        const userSlugs: string[] = await getViewsForUser(email)

        let matchedChild = !userSlugs?.length ? [] : userSlugs.find(uSlug => uSlug.substring(1)===slug)

        if(matchedChild) {
            resolve(matchedChild)
        } else {
            reject(new Error(`invalid slug, user is not the owner`))
        }
    }); 
}

export default getHandler()
    .get('/api/info/slug/:slug', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // let user = await users.getUser(req.session.userId)
        // let { email } = getUserDetails(user)
        let email = 'sanshit.sagar@gmail.com'
    
        let slug = req.params.slug
        
        if(slug?.length) {
            let promise = await isSlugVisited(slug)
            .then((response) => {
                res.status(200).json({ response })
            }).catch((error) => {
                res.status(500).json({ error: error.message }) 
            })
        } else {
            res.status(403).json({ error: 'missing_slug_parameter' })
        }
        
    })
    .get('/api/info/clickstream/:slug/:amount/:range/:interval', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = 'sanshit.sagar@gmail.com'
    
        const slug: string = req.params.slug
        
        const amount: number = parseInt(req.params.amount) || 1
        const range: string = req.params.range
        const interval: string = req.params.interval
        
        if(slug && range) {
            try {
                const data = await getFormattedClickstream({ slug, amount, range, interval })

                res.status(200).json({
                    data,
                    ...ResourceDataFactory(slug, email, 'Slug', 'Clickstream')
                })
            } catch(error) {
                console.error(error)
                res.status(500).json({ error: `Encountered an error: ${error}` })
            }
        } else {
            res.status(403).json({ error: 'invalid params, slug or range missing'})
        }
    })
    .get('/api/info/clickstream/:amount/:range/:interval/slug/:slug1/:slug2', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = 'sanshit.sagar@gmail.com'

        const amount: number = parseInt(req.params.amount) || 1
        const range: string = req.params.range
        const interval: string = req.params.interval

        const slug1: string = req.params.slug1
        const slug2: string = req.params.slug2
        let slugs = [slug1, slug2]
        let promises = []

        slugs.map((slug: string, index: number) => {
            promises.push(return new Promise((resolve, reject) => {
                await getFormattedClickstream({ slug, amount, range, interval })
            }).then((response) => {

            }).catch((error) => {

            });
        }

        if(slug1 && slug2) {
            Promise.all([
                getFormattedClickstream({ slug: slug1, amount, range, interval }),
                getFormattedClickstream({ slug: slug2, amount, range, interval })
            ])
        } else {
            res.status(403).json({ error: 'invalid params, >= 2 slugs are required'})
        }
    })
