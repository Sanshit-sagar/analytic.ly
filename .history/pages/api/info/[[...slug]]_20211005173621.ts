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
const getFormattedClickstream(slug, amount, range, interval) {
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
    } else {
        res.status(400).json({ error: 'BAD_REQUEST_INVALID_SLUG' }); 
    }
}

const isSlugVisited = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        const views: number = await getViewsForSlug(slug)

        if(views > 0) {
            resolve(`${views} Views`)
        } else {
            reject('0 Views')
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
            const = getFormattedClickstream(slug, amount, range, interval)
            res.status(200).json({ 
                mergedIntervals,
                viewsByIntervals,
                boundaries,
                slug,
                range,
                interval,
                numPeriods,
                numClicks
            })

        } catch(error) {

            console.error(error)
            res.status(500).json({ 
                error: `Encountered an error: ${error}` 
            })
        }
    });


    // .get('/api/info/differential/:slug1/:slug2/:amount/:range/:interval', async (req: NextApiRequestExtended, res: NextApiResponse) => {
    //     let slug1: string = req.params.slug1
    //     let slug2: string = req.params.slug2

    //     const amount: number = parseInt(req.params.amount) || 1
    //     const range: string = req.params.range
    //     const interval: string = req.params.interval

    // });