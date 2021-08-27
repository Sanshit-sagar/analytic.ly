import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { }


const Timeseries = () => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

    if(loading) return <GraphSkeleton />;
    if(error) return <Text>Error: {error.message} </Text> 

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 

                <Box css={{ border: 'thin solid black', br: '$2'}}> 
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2' }}> 
                        <Text> Start Timestamp: {minTimestamp} </Text> 
                        <Text size='1'> {JSON.stringify(clicks)} </Text>

                    </Flex>
               </Box>
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}