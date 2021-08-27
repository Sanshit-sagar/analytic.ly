import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import Loading from '../Loading'
import { useClickHistoryForUser } from '../../hooks/useClicks'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import {
    Datum,
    ClickHistoryProps,
    TimeStamp,
    ClickScore,
    ClickDate
} from './interfaces'

import PrimaryChart from './PrimaryChart'

let data: Datum[] = []


const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(quantity, timeAgo, tickSize)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    let start: number = parseInt(minTimestamp)
    // let end: number = new Date().getTime()
    // let duration: number = new Date().getTime() - start
    // let numIntervals: number = duration/parseInt(tickSize)

    clicks.map((click: { x: number, y: number }, i: number) => {
        let timestamp: TimeStamp = start + click.x
        let clickscore: ClickScore = click.y
        let clickdate: ClickDate = new Date(start + click.x)
        data.push({ index: i, timestamp, clickscore, clickdate }); 
    });
    
    return (
            <DashboardDisplayBox>    
                <VisxParentSizeWrapper> 
                    <ParentSize> 
                        {({ height, width }) => {
                                return (
                                    <PrimaryChart
                                        height={height}
                                        width={width}
                                        data={data}
                                    />
                                );                              
                            }}
                    </ParentSize>
                </VisxParentSizeWrapper>
            </DashboardDisplayBox>
}

export default ClickHistory





