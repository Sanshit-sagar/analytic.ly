import { NextApiResponse } from 'next'

import getHandler, { 
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import { getHourlySeries, aggregateClicksForTimeseries } from '../../../lib/utils/timeseries'
import { getDoubleEndedClickstream } from '../../../lib/redis/clicks'
// import { setTimeForDate } from '../../../lib/utils/dateUtils'

export default getHandler()
    .get('/api/metrics/clickstream/recent/:time/:unit',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const time: string = req.params.time
        const unit: string = req.params.unit
        const isAsc: boolean = true 

        let multiplier: number = (unit==='mins') ? 60*1000 : unit==='secs' ? 1000 : unit==='hours' ? 60*60*1000 : -1; 

        if(time && unit && (unit==='hours' || unit==='mins' || unit==='secs') && multiplier!==-1) {
            let start: number =  new Date().getTime() - (parseInt(`${time}`) * multiplier)
            let end: number = new Date().getTime()

            const timeseries = await getHourlySeries(start, end);
            const clickstream = await getDoubleEndedClickstream(start, end, isAsc); 
            const aggregatedClicks = await aggregateClicksForTimeseries(timeseries, clickstream); 

            res.status(200).json({ timeseries, clickstream, aggregatedClicks, start, end });
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_DATE' })
        }
    });