import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSession, Session, Nullable, WithSessionProp } from '@clerk/nextjs/api'

export interface NextApiRequestExtended extends NextApiRequest {
    filter: string | string[];
    value: string | string[] | null;
    params: any;
    email: string | string[];
    name: string | string[];
    image: string | string[]; 
    slug: string | string[]; 
    session?: Session | undefined;
    userId: Nullable<string>; 
}

function getHandler()
    let userId: Nullable<string> = req?.session?.userId ?? ''

    return nextConnect<NextApiRequestExtended, NextApiResponse>({
        onError(error, req, res) {
            res.status(500).json({ error: `Encountered an unknown error. ${error.message}`}); 
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} not allowed on the path`}); 
        },
        attachParams: true,
    }).use((req, res, next) => {

            req.userId = userId
            req.email = ''
            req.name = ''
            req.image = ''
            next(); 
    })
}

export default withSession(getHandler)