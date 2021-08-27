import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import Loading from '../Loading'
import { useClickHistoryForUser } from '../../hooks/useClicks

let data: Datum[] = []
let history: ClickHistory | null = null


const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(quantity, timeAgo, tickSize)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    let start: number = parseInt(minTimestamp)
    let end: number = new Date().getTime()
    let duration: number = new Date().getTime() - start
    let numIntervals: number = duration/parseInt(tickSize)

    clicks.map((click: { x: number, y: number }, i: number) => {
        let timestamp: TimeStamp = start + click.x
        let clickscore: ClickScore = click.y
        let clickdate: ClickDate = new Date(start + click.x)
        data.push({ index: i, timestamp, clickscore, clickdate }); 
    });

    history = {
        clicks: [...data], 
        start: new Date(start),
        end: new Date(end),
        durationInMs: duration,
        tickSize: parseInt(tickSize),
        numIntervals
    }
    
    return (
        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}> 
                <Text> Click History </Text>
                <Text> {`${JSON.stringify(data)}`}</Text> 
                <PrimaryChart
                    height={height}
                    width={width}
                    data={history}
                />
            </Flex>
        </Box>
    )
}

export default ClickHistory





