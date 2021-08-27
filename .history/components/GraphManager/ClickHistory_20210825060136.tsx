import React from 'react'

import { Text } from '../../primitives/Text'

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


const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(quantity, timeAgo, tickSize)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    const start: number = parseInt(minTimestamp)
    const data: Datum[] = clicks.map((click: { x: number, y: number }, i: number) => {
        let timestamp: TimeStamp = start + click.x
        let clickscore: ClickScore = click.y
        let clickdate: ClickDate = new Date(start + click.x)
        return { index: i, timestamp, clickscore, clickdate }
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
    );
}

export default ClickHistory





