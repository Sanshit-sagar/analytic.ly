import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { SlugRankings } from '../../../lib/utils/formatters'
import {
    getViewsForSlug,
    getClickstreamForSlug,
    getUniqueViewsForSlug,
    getUniqueVisitorsForSlug
} from '../../../lib/redis/slugs'
import { 
    getUniqueIpsForSlug,
    getRankedUniqueIpsForSlug 
} from '../../../lib/redis/users'

const BAD_REQUEST = 'BADLY FORMED REQUEST'

function formatClickstream(clicks: Click[]) {
    
}

export default getHandler()
    .get('/api/slugs/:slug/views', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug
        // todo check user email via getSession() - next-auth & verify slug belongs to that email

        if(slug) {
            const views: number = await getViewsForSlug(slug)
            res.status(200).json({ views, slug }); 
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_SLUG'})
        }
    })
    .get('/api/slugs/:slug/views/more', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug

        if(slug) {
            const clickstream: any[] = await getClickstreamForSlug(slug);
            res.status(200).json({ 
                clickstream: formatClickstream(clickstream),
                count: clickstream.length,
                slug: `/${slug}`
            });
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_SLUG' })
        }
    })
    .get('/api/slugs/:slug/views/unique', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug

        if(slug) {
            const uniqueViewCountForSlug: number = await getUniqueViewsForSlug(slug);
            res.status(200).json({ uniqueViews: uniqueViewCountForSlug, slug })
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_SLUG' })
        }
    })
    .get('/api/slugs/:slug/views/unique/more', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug

        if(slug) {
            const uniqueVisitorsForSlug: SlugRankings = await getUniqueVisitorsForSlug(slug);
            res.status(200).json({
                category: uniqueVisitorsForSlug.category,
                rankings: uniqueVisitorsForSlug.rankings,
                slug
            })
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_SLUG' })
        }
    })
    .get('/api/slugs/:slug/unique/ips', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let slug: string = req.params.slug

        if(slug) {
            try {
                slug = slug.startsWith('/') ? slug : `/${slug}`
                let uniqueIps: string[] = await getUniqueIpsForSlug(slug);
                res.status(200).json({ uniqueIps }); 
            } catch(error) {
                res.status(500).json({ error: `${error?.message || ''}`})
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST })
        }
    })
     .get('/api/slugs/:slug/unique/ips/scores', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let slug: string = req.params.slug

        if(slug) {
            try {
                slug = slug.startsWith('/') ? slug : `/${slug}`
                let rankedUniqueIps: string[] = await getRankedUniqueIpsForSlug(slug);
                res.status(200).json({ rankedUniqueIps }); 
            } catch(error) {
                res.status(500).json({ error: `${error?.message || ''}`})
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST })
        }
    })
   