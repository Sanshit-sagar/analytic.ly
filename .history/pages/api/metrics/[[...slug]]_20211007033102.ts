import { NextApiResponse } from 'next'

import getHandler, { NextApiRequestExtended } from '../../../lib/utils/helpers'
import { generateTimeseries } from '../../../lib/utils/xyseries'
import { generateVoronoi } from '../../../lib/redis/users'
import { getClickstream, getDoubleEndedClickstream } from '../../../lib/redis/clicks'
import { getTicksInRange, getRangeBoundaries, getLabelsFromBounds } from '../../../lib/utils/d3time'
import { calibrateCache } from '../../../lib/redis/admin'
import { merge } from '../../../lib/utils/mergers'
import { TimeFocusedClick } from '../../../interfaces/clicks'
import { zip, group, flatGroup, index, flatRollup, rollup } from 'd3-array'

// import { requireSession, users } from '@clerk/nextjs/api'

export type ClickType = {
    id: string; 
    cfRay: string; 
    timestamp: number; 
    user: string; 
    slug: string; 
}[]; 

export type UserClickstream = {
    clicks: ClickType[];
    start: Date;
    end: Date; 
}

type DetailedClick = {
    points: TimeFocusedClick;
    user: string; 
    uniques: number;
    mostViews: number; 
    mostUniques: number;
    mostFrequentVisitorIp: string;
    mostViewed: string; 
    lastViewedAt: string;  
    rangeZ: [1,11],
    rangeX: [2,2],
    rangeY: [0,86400000],
    timestamp: number,
    size: 44,
}

const transformGroup  = (detailedClicks: DetailedClick[]) => {
    return Array.from(group(detailedClicks, (dclick: DetailedClick) => {
        dclick.timestamp
    })
}

export default getHandler()
    .get('/api/metrics/user/:email/clickstream/:time/:unit', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const time: string = req.params.time
        const unit: string = req.params.unit
    
        let multiplier: number = (unit.startsWith('month')) ? 1000*60*60*24*30 : (unit==='week') ?  1000*60*60*24*7 : (unit.startsWith('day')) ? 1000*60*60*24 : (unit==='hour') ? 1000*60*60 : (unit==='mins') ? 60*1000 : unit==='secs' ? 1000 : unit==='hours' ? 60*60*1000 : -1; 

        if(time && unit && multiplier!==-1) {
            let startTimestamp: number =  new Date().getTime() - (parseInt(`${time}`) * multiplier)
            let endTimestamp: number = new Date().getTime()

            const { timeseries, start, end } = await generateTimeseries(startTimestamp, endTimestamp)
            
            if(!timeseries) {
                res.status(200).json({ error: 'INVALID TIME/UNIT OR NO MATCHES FOUND', timeseries: [], start, end }); 
            } else {
                res.status(200).json({ timeseries, start, end, unit });
            }
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_DATE' })
        }
    })
    .get('/api/metrics/user/:email/scattered', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.email
        
        if(email) {
            const voronoi = await generateVoronoi(email); 
            let groupedByPoints = getGroupedData(voronoi)

            if(voronoi) {
                res.status(200).json({ ...voronoi });
            } else {
                res.status(200).json({ error: 'NO_MATCHES_FOUND', voronoi })
            }
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_EMAIL'})
        }
    })
    .get('/api/metrics/slug/:slug/views', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug

        if(slug) {
            const data: UserClickstream = await getDoubleEndedClickstream(0, -1, slug, 'slug', true);
            res.status(200).json({ ...data });
        } else {
            res.status(400).json({ error: 'BAD_REQUEST_INVALID_SLUG' }); 
        }
    })
    .get('/api/metrics/slug/:slug/tail/:amount/:range/:interval', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug
        const amount: number = parseInt(req.params.amount) || 1
        const range: string = req.params.range
        const interval: string = req.params.interval
        
        if(slug && range) {
            const { views, minTimestamp, maxTimestamp } = await getDoubleEndedClickstream(0, -1, slug, 'slug', true);
            const boundaries: number[] = getRangeBoundaries(amount, range, interval); 
            const ticksInRange: number[] = getTicksInRange(boundaries[0], boundaries[1], interval, interval);
            const { mergedIntervals, viewsByIntervals, bounds, numPeriods, numClicks } = merge(views, boundaries, ticksInRange, interval); 

            res.status(200).json({ 
                mergedIntervals,
                viewsByIntervals,
                boundaries,
                slug,
                range,
                interval,
                numPeriods,
                numActivePeriods: numClicks
            });
        } else {
            res.status(400).json({ error: 'BAD_REQUEST_INVALID_SLUG' }); 
        }
    })
    .get('/api/metrics/user/:email/tail/:amount/:range/:interval', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email: string = req.params.email
        const amount: number = parseInt(req.params.amount) || 1
        const range: string = req.params.range
        const interval: string = req.params.interval
        
        if(email && range) {
            const { views, minTimestamp, maxTimestamp } = await getDoubleEndedClickstream(0, -1, email, 'user', true);
            const boundaries: number[] = getRangeBoundaries(amount, range, interval);
            const ticksInRange: number[] = getTicksInRange(boundaries[0], boundaries[1], interval, interval);
            const { mergedIntervals, viewsByIntervals, bounds, numPeriods, numClicks } = merge(views, boundaries, ticksInRange, interval); 

            res.status(200).json({ 
                mergedIntervals,
                viewsByIntervals,
                bounds,
                email,
                range,
                interval,
                numPeriods,
                numClicks,
                minTimestamp, 
                maxTimestamp
            });
        } else {
            res.status(400).json({ error: 'BAD_REQUEST_INVALID_SLUG' }); 
        }
    })
    .get('/api/metrics/labels/:bound0/:bound1', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        try { 
            let bound0: number = parseInt(req.params.bound0) || new Date(1970,1,1).getTime()
            let bound1: number = parseInt(req.params.bound1) || new Date().getTime()

             if(bound0 && bound1) {
                 const bounds: number[] = [bound0, bound1] 
                 let labels = getLabelsFromBounds(bounds, 4, 'dayhourmin')
                 res.status(200).json({ labels })
             } else {
                 res.status(403).json({ error: `Bad Request please provide bound0 and bound1` });
             } 
        } catch(error: any) {
            res.status(500).json({ error: `${error?.message || ''}` })
        }
    })
    .get('/api/metrics/dates/every/:interval/from/:start/to/:end', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const start: number = parseInt(req.params.start)
        const end: number = parseInt(req.params.end)
        const interval: string = req.params.interval
        
        let range: number[] = getTicksInRange(start, end, interval, 'hourminsec');
        

        res.status(200).json({ 
            range,
            start: `${new Date(start).toLocaleString()}`, 
            end: `${new Date(end).toLocaleString()}`,
            length: range.length
        });
    })
    .get('/api/metrics/admin/calibrate-cache',  async (_, res: NextApiResponse) => {
        let result = await calibrateCache();
        if(!result) {
            res.status(500).json({ error: 'NO CLICKS FOUND', result: null }); 
        } else {
            res.status(200).json({ result, message: 'SUCCESS!' });
        }
    })
    .get('/api/metrics/user/:email/clickstream',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                 const clicks = await getClickstream(email);
                 res.status(200).json({ clicks })
            } catch(error: any) {
                 res.status(500).json({ error: `${error?.message ?? ''}`})
            }
        } else {
            res.status(403).json({ error: 'INVALID EMAIL' })
        }
    })
    .get('/api/metrics/user/:email/clickstream/grouped', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email
           
        try {
            const clicks = await getClickstream(email)
            const groups = transformGroup(clicks)
            res.status(200).json({ groups }) 
        } catch(error) {
            res.status(403).json({ error })
        }
    });