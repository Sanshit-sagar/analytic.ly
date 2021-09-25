
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { withSession } from '@clerk/nextjs/api'

export interface NextApiRequestExtended extends NextApiRequest {
    filter: string | string[];
    value: string | string[] | null;
    params: any;
    email: string | string[];
    name: string | string[];
    image: string | string[]; 
    slug: string | string[]; 
    session?: Session | undefined;
}

function getHandler() {
    return nextConnect<NextApiRequestExtended, NextApiResponse>({
        onError(error, req, res) {
            res.status(500).json({ error: `Encountered an unknown error. ${error.message}`}); 
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} not allowed on the path`}); 
        },
        attachParams: true,
    }).use((req, res, next) => {
        
            // TODO: call await getSession() here
            req.email = req.session.userId
            req.name = '';
            req.image = ''; 

            next(); 
    })
}

export default withSession()


// Middleware<NextApiRequestExtended & NextApiRequest & { session?: Session | undefined; }, ServerResponse & { send: Send<...>; ... 4 more ...; clearPreviewData: () => NextApiResponse<...>; }>