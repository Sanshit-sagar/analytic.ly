
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

export interface NextApiRequestExtended extends NextApiRequest {
    filter: string | string[];
    value: string | string[] | null;
    params: any;
    email: string | string[];
    name: string | string[];
    image: string | string[]; 
    slug: string | string[];
    session: {
        userId: string; 
        primaryEmailAddressId: string | undefined;
    }
}

export default function getHandler() {
    return nextConnect<NextApiRequestExtended, NextApiResponse>({
        onError(error, req, res) {
            res.status(500).json({ error: `Encountered an unknown error. ${error.message}`}); 
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} not allowed on the path`}); 
        },
        attachParams: true,
    }).use((req: NextApiRequestExtended, res: NextApiResponse, next) => {
        let name = ''
        let email = ''
        let image = '' 
        
        req.email = email || req.query.email || ''
        req.name = name || req.query.name || ''
        req.image = image || req.query.slug || ''
        
        next(); 
    });
}
