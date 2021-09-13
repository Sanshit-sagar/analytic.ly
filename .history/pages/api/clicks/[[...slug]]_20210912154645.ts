import { NextApiResponse } from 'next'

import getHandler, { 
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import { 
    getClickstream, 
    getClickFromField,
    getDoubleEndedClickstream,
    getClickstreamOnDate
} from '../../../lib/redis/clicks'

import {
    doesExist,
    getDateFromArray, 
} from '../../../lib/utils/dateUtils'

const NO_MATCHES_FOUND = 'No Matches found for the given range'
const BAD_REQUEST_INVALID_DATE = 'Bad Request, Invalid date format. please use the format: mm-dd-yy'
const BAD_REQUEST_INVALID_RANGE = 'Bad Request, no range specified'
const BAD_REQUEST_INVALID_RECENT_TIME_STR = 'Bad request. Please use the format /api/clicks/recents/{time}/{hours | mins | secs'

export default getHandler()
    .get('/api/clicks/:slug', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // TODO: Paginate this with useSWRInfinite 

        let email: string | string[] = req.params.slug || ''
        let clicks: any[] | null = await getClickstream(email)
        
        res.status(200).json({ 
            clicks: clicks ? [...clicks] : [],
            numClicks: clicks?.length || 0,
            email,
        });
    })
    .get('/api/clicks/filter/:name/value/:value', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let filterName: string | string[] = req.params.name
        let filterValue: string | string[] = req.params.value

        if(filterName==='cfRay' && doesExist(filterName) && doesExist(filterValue)) {
            const click = await getClickFromField(filterName, filterValue);
           
            if(click && Object.entries(click)?.length) {
                res.status(200).json({ click }); 
            } else {
                res.status(200).json({ error: NO_MATCHES_FOUND, clickDetails: {} })
            }
        } else {
            res.status(404).end('NOT FOUND');
        }
    })
    .get('/api/clicks/range/:start/to/:end', async (req: NextApiRequestExtended, res: NextApiResponse) => {
           
        const start = req.params.start;
        const end = req.params.end;
        
        if(!start && !end) {
            res.status(403).json({ error: BAD_REQUEST_INVALID_RANGE });
        } else {
            let clickstream: any[] = []; 

            if(start && !end) {
                res.status(200).json({ message: `Getting clickstream starting at ${new Date(start).getTime().toString()}`})
            } else if(!start && end) {
                res.status(200).json({ message: `Getting clickstream ending at ${new Date(end).getTime().toString()}`})
            } else {
                clickstream = await getDoubleEndedClickstream(start, end, undefined, 'none', true);
            }

            if(clickstream?.length) {
                res.status(200).json({ clicks: clickstream }); 
            } else {
                res.status(200).json({ clicks: [], error: NO_MATCHES_FOUND }); 
            }
        }
    })
    .get('/api/clicks/on/date/:date', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        
        const dateStr: string = req.params.date;
        const isAsc: boolean = true;

        const date: Date | null = getDateFromArray(dateStr.split('-'));

        if(dateStr.split('-').length === 3 && date) {
            let clicks: any[] | any = await getClickstreamOnDate(date, isAsc);
            
            if(clicks?.length) {
                res.status(200).json({ clicks });
            } else {
                res.status(200).json({ clicks: [], error: NO_MATCHES_FOUND, date })
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST_INVALID_DATE }); 
        }   
    })
    .get('/api/clicks/recents/:time/:unit',  async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const time: string = req.params.time
        const unit: string = req.params.unit
        const isAsc: boolean = true 
        let multiplier: number = (unit==='mins') ? 60*1000 : unit==='secs' ? 1000 : unit==='hours' ? 60*60*1000 : -1; 

        if(time && unit && (unit==='hours' || unit==='mins' || unit==='secs') && multiplier!==-1) {
            let currentTimestamp: number = new Date().getTime()
            let startTimestamp: number = currentTimestamp - (parseInt(`${time}`) * multiplier)

            const clicks = await getDoubleEndedClickstream(startTimestamp, currentTimestamp, undefined);

            if(clicks?.length) {
                res.status(200).json({ clicks, startTimestamp })
            } else {
                res.status(200).json({ clicks: [], error: NO_MATCHES_FOUND })
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST_INVALID_RECENT_TIME_STR });
        }
    })
    .get('/api/clicks/paginate/:email/:cursor/:amount', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        
    }