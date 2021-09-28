import {
    NextApiRequestExtended,
}

export default getHandler()
    .post('/api/urchins/new/:email', requireSession(async (req: WithSessionProp<NextApiRequestExtended>, res: NextApiResponse) => {
        let userId = req?.session?.userId  ?? '' 
        let email = 


        res.status(200).json({ 
            userId,
            session: JSON.stringify(req?.session)
        })
    })); 