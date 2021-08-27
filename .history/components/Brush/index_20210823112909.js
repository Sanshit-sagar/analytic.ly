import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';



const Timeseries = () => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 

                <Box css={{ }}
                <Text size='1'> {JSON.stringify(clicks) </Text>
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}