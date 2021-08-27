import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';



const Timeseries = () => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 

                <Box css={{ border: 'thin solid black', br: '$2'}}> 
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2' }}> 
                        <Text size='1'> {JSON.stringify(clicks) </Text>
                    </Flex>
               </Box>
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}