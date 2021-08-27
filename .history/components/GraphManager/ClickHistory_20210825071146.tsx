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

const ClickHistory = ({ amount, range, interval }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    const start: number = parseInt(minTimestamp)
    const mappedData: Datum[] = clicks.map((click: { x: number, y: number }, i: number) => {
        let timestamp: TimeStamp = click.x
        let clickscore: ClickScore = click.y
        let clickdate: ClickDate = new Date(click.x)
        return { index: i, timestamp, clickscore, clickdate }
    });

    console.log(`DATA IS HERE: ${JSON.stringify(mappedData)}`); 
    
    return (
            <DashboardDisplayBox>    
                <VisxParentSizeWrapper> 
                    <ParentSize> 
                        {({ height, width }: HeightProps) => {
                            return (
                                <PrimaryChart
                                    data={mappedData}
                                    height={575}
                                    width={1250}
                                    margin={{
                                        top: 10,
                                        right: 11,
                                        bottom: 10,
                                        left: 10,
                                    }}
                                />
                            );
                        }}
                    </ParentSize>
                </VisxParentSizeWrapper>
            </DashboardDisplayBox>
    );
}

export default ClickHistory





