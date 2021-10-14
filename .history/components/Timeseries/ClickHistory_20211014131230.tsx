import React, { useEffect } from 'react'

import Brush from './Brush'
import { Text } from '../../primitives/Text'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'

import { useUpdateAtom } from 'jotai/utils'
import { updateTimeseriesAtom } from '../../atoms/timeseries'


const ClickHistory = ({ interval }: { interval: string }) => {
    const updateTimeseries = useUpdateAtom(updateTimeseriesAtom)
    
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()
 
    useEffect(() => {
        if(loading || error || !clicks) return;

        updateTimeseries({
            data: clicks, 
            start: minTimestamp,
            tick: interval
        });
    }, [clicks, loading, error, minTimestamp, interval, updateTimeseries])

    if(loading) return <Text> Loading... </Text>
    if(error || !clicks?.length) return <Text> Error! </Text> 

    return <Brush />;
}

export default ClickHistory