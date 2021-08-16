import { NextApiResponse } from 'next'

import getHandler, { 
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import { generateTimeseries } from '../../../lib/utils/xyseries'

export default getHandler()
    .get('/api/metrics/clickstream/recent/:time/:unit', async (req: NextApiRequestExtended, res: NextApiResponse) => {
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
    });