import { NextApiResponse } from 'next'

import getHandler, { 
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import { getHourlySeries } from '../../../lib/utils/timeseries'
import { setTimeForDate } from '../../../lib/utils/dateUtils'

export default getHandler()
    .get('/api/metrics/clickstream',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // const time: string = req.params.time
        // const unit: string = req.params.unit
        // const isAsc: boolean = true 
        // let multiplier: number = 60*60*1000*24;
        // (unit==='mins') ? 60*1000 : unit==='secs' ? 1000 : unit==='hours' ? 60*60*1000 : -1; 

        // if(time && unit && (unit==='hours' || unit==='mins' || unit==='secs') && multiplier!==-1) {
        let start: Date = new Date()
        const clicks = await getHourlySeries(start);
        
        res.status(200).json({ clicks, start });
        // } else {
            // res.status(403).json({ error: 'Bad Request' });
        // }
    });