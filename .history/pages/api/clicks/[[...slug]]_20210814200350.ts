import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    getClickstream, 
    getClickFromField,
    getDoubleEndedClickstream,
    getClickstreamOnDate,
    // getClickstreamStartingAt,
    // getClickstreamEndingAt,
} from '../../../lib/redis/clicks'

import {
    getDateFromArray, 
    doesExist
} from '../../../lib/utils/dateUtils'

import getHandler from '../../../lib/utils/helpers'

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
        let clickDetails: any = {};
        let filterName: string | string[] = req.params.name || ''
        let filterValue: string | string[] = req.params.value || ''

        if(filterName==='cfRay' && doesExist(filterName) && doesExist(filterValue)) {
            console.log(`Looking for click with ${filterName} equals ${filterValue}`)
            clickDetails = await getClickFromField(filterName, filterValue);
           
            if(clickDetails && Object.entries(clickDetails)?.length) {
                res.status(200).json({ clickDetails }); 
            } else {
                res.status(404).json({ error: 'NO MATCH FOUND', clickDetails: {} })
            }
        } else {
            res.status(404).end('NOT FOUND');
        }
    })
    .get('/api/clicks/range/:start/to/:end', async (req: NextApiRequestExtended, res: NextApiResponse) => {
           
        const start = req.params.start;
        const end = req.params.end;
        // const direction = req.params.direction;
        // let dir = (direction!=='ltr' && direction!=='rtl') ? 'rtl' : (direction || 'rtl')
        // console.log(`LOOKING FOR CLICKS FROM: ${start} to ${end} with direction ${dir}`)
        
        if(!start && !end) {
            res.status(403).json({ error: 'Bad Request, no range specified' });
        } else {
            let clickstream: any[] = []; 
            let isAsc = false // todo: read this from params    
            
            // TODO: create separate endpoints for the starting at and ending at functions 
            if(start && !end) {
                // clickstream = await getClickstreamStartingAt(start, isAsc); 
                res.status(200).json({ message: `Getting clickstream starting at ${new Date(start).getTime().toString()}`})
            } else if(!start && end) {
                // clickstream = await getClickstreamEndingAt(end, isAsc);
                res.status(200).json({ message: `Getting clickstream ending at ${new Date(end).getTime().toString()}`})
            } else { // start && end
                clickstream = await getDoubleEndedClickstream(start, end, isAsc)
            }

            if(clickstream?.length) {
                res.status(200).json({ clicks: clickstream }); 
            } else {
                res.status(404).json({ error: 'No Matches found for the given range' }); 
            }
        }
    })
    .get('/api/clicks/by/date/:date', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        
        const dateStr: string = req.params.date;
        const dateArr: string[] = dateStr.split('-');
        const date: Date | null = getDateFromArray(dateArr);
        const isAsc: boolean = true;

        if(dateArr.length !== 3 || !date) {
            res.status(403).json({ error: 'Bad Request, Invalid date format. please use: mm-dd-yy'}); 
        } else {
            let clickstream: any[] | any = await getClickstreamOnDate(date, isAsc);
            res.status(200).json({ clickstream });
        }   
    });