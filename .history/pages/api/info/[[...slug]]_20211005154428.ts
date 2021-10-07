import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

import { getViewsForSlug } from '../../../lib/redis/slugs'
import { getViewsForUser } from '../../../lib/redis/users'
import{ getDoubleEndedClickstream } from '../../../lib/redis/clicks'
import { getTicksInRange, getRangeBoundaries } from '../../../lib/utils/d3time'

interface Click {
    id: string; 
    cfRay: string; 
    timestamp: number; 
    slug: string; 
    user: string;
};

type BoundedClickstream = {
    views: Click[];
    minTimestamp: number;
    maxTimestamp: number;
}

interface ClickstreamDetails {
    clickstream: Click[];
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

function getFormattedClickstream({
    views,
    minTimestamp, 
    maxTimestamp, 
    amount, 
    range, 
    interval
}: {
    views: Click[];
    minTimestamp: number;
    maxTimestamp: number;
    amount: number;
    range: number;
    interval: number;
    slug: string; 
}): ClickstreamDetails => {
    const boundaries: number[] = getRangeBoundaries(amount, range, interval)
    const ticksInRange: number[] = getTicksInRange(boundaries[0], boundaries[1], interval, interval)
    const { mergedIntervals, viewsByIntervals, bounds, numPeriods, numClicks } = merge(views, boundaries, ticksInRange, interval)

    return {
        clickstream: [...mergedIntervals],
        partitions: [...viewsByIntervals],
        range: { 
            start: bounds[0],
            end: bounds[1],
        },
        partitionCount: numPeriods,
        clickCount: numClicks,
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
    .get('/api/info/difference/:slug1/amount/range/interval', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = 'sanshit.sagar@gmail.com'
    
        let slug1: string = req.params.slug1
        let amount: number = parseInt(req.params.amount)
        let range: number = parseInt(req.params.range)
        let interval: number = parseInt(req.params.interval)
                
        if(slug1?.length) {
            const { views, minTimestamp, maxTimestamp }: BoundedClickstream = await getDoubleEndedClickstream(0, -1, slug1, 'slug', true)
            const data = getFormattedClickstream(views, minTimestamp, maxTimestamp, amount, range, interval, slug1)

            res.status(200).json({
                data: views,
                range: {
                    start: minTimestamp,
                    end: maxTimestamp,
                },
                resource: 'Slug',
                user: email,
                collection: 'Clickstream'
            })
        } else {
            res.status(403).json({ error: `need_at_least_two_slugs` })
        }
    })