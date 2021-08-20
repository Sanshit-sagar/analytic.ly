import { NextApiResponse } from 'next'

import getHandler, { NextApiRequestExtended } from '../../../lib/utils/helpers'
import { generateTimeseries } from '../../../lib/utils/xyseries'
import { generateVoronoi } from '../../../lib/redis/users'
import { getDoubleEndedClickstream } from '../../../lib/redis/clicks'
import { getTicksInRange, getRangeBoundaries } from '../../../lib/utils/d3time'
import { calibrateCache } from '../../../lib/redis/admin'
import { merge } from '../../../lib/utils/mergers'

export default getHandler()
    .get('/api/metrics/user/:email/clickstream/:time/:unit', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const time: string = req.params.time
        const unit: string = req.params.unit
        // const isAsc: boolean = true 

        let multiplier: number = (unit==='mins') ? 60*1000 : unit==='secs' ? 1000 : unit==='hours' ? 60*60*1000 : -1; 

        if(time && unit && (unit==='hours' || unit==='mins' || unit==='secs') && multiplier!==-1) {
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
            const views: any[] = await getDoubleEndedClickstream(0, -1, slug, 'slug', true);
            res.status(200).json({ views });
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
                bounds,
                slug,
                range,
                interval,
                numPeriods,
                numClicks
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
                maxTimestamp,
                message: 'hi'
            });
        } else {
            res.status(400).json({ error: 'BAD_REQUEST_INVALID_SLUG' }); 
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
        try {
            let result = await calibrateCache();
            if(!result) {
                res.status(500).json({ error: 'NO CLICKS FOUND', result: null }); 
            } else {
                res.status(200).json({ result, message: 'SUCCESS!' });
            }
        } catch(error) {
            res.status(500).json({ error: `FAILURE: ${error.message}` });
        }
    });