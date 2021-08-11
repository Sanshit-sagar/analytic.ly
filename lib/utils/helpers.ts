
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

export interface NextApiRequestExtended extends NextApiRequest {
    email: string | null;
    name: string | null;
    image: string | null; 
}

export default function getHandler() {
    return nextConnect<NextApiRequestExtended, NextApiResponse>({
        onError(error, req, res) {
            res.status(500).json({ error: `Encountered an unknown error. ${error.message}`}); 
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} not allowed on the path`}); 
        },
    }).use((req, res, next) => {
            // TODO: call await getSession() here
            req.email = null;
            req.name = null;
            req.image = null; 

            // TODO if(!session) { next(); } -> ?? throw a 403?
            req.email = 'sanshit.sagar@gmail.com';
            req.name = 'Sanshit Sagar';
            req.image = 'https://vercel.com/api/www/avatar/acpdcw8EbDA1fgbBGE6umxiX?&s=160'
            
            next(); 
    }); 
}
