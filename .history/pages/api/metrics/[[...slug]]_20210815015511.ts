import { NextApiResponse } from 'next'

import getHandler, { 
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import { getHourlySeries } from '../../../lib/utils/timeseries'
import { setTimeForDate } from '../../../lib/utils/dateUtils'

export default getHandler()
    .get('/api/metrics/clickstream/recents/:time/:unit',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const time: string = req.params.time
        const unit: string = req.params.unit
        // const isAsc: boolean = true 
        let multiplier: number = (unit==='mins') ? 60*1000 : unit==='secs' ? 1000 : unit==='hours' ? 60*60*1000 : -1; 

        if(time && unit && (unit==='hours' || unit==='mins' || unit==='secs') && multiplier!==-1) {
            let start: number =  new Date().getTime() - (parseInt(`${time}`) * multiplier)
            let end: number = new Date().getTime()

            const clicks = await getHourlySeries(start, end);
            res.status(200).json({ clicks, start });
        } else {
            res.status(403).json({ error: 'BAD_REQUEST_INVALID_DATE' })
        }
    });