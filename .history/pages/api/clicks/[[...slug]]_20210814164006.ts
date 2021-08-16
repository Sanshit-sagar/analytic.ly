import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/utils/helpers'

import { 
    getClickstream, 
    getClickFromField,
    getClickstreamStartingAt,
    getClickstreamEndingAt,
    getDoubleEndedClickstream,
    getClickstreamOnDate
} from '../../../lib/redis/clicks'

import getHandler from '../../../lib/utils/helpers'

// function getLocaleFormat(timestamp: string | number | null): string {
//     return timestamp ? new Date(timestamp).toLocaleString() : ''; 
// }

export function doesExist(field: string | string[]): boolean {
    return field?.length > 1 ? true : false; 
}

export function isValidDate(ts: number) {
    try {
        let dateObj = new Date(parseInt(`${ts}`)); 
        return isFinite(ts) && Object.prototype.toString.call(dateObj) === '[object Date]'
    } catch(error) {
        return false; 
    }
}

export function isValidRange(startDate: number, endDate: number) {
    const dtNow = new Date().getTime(); 
    // TODO: validate against earliest date in DB which should be stored /cached
    if(startDate<endDate && endDate<dtNow && isValidDate(startDate) && isValidDate(endDate)) {
        return true;
    }
    return false; 
}


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
            
            if(start && !end) {
                clickstream = await getClickstreamStartingAt(start, isAsc); 
            } else if(!start && end) {
                clickstream = await getClickstreamEndingAt(end, isAsc);
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
        
        const date = req.params.date;
        res.status(200).json({ date });
        // getClickstreamOnDate
    });