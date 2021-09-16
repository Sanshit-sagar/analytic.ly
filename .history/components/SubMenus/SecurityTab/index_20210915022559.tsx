import React from 'react'
import { atom, useAtom } from 'jotai'
import { Meter } from '../../../compositions/Meter'

const meterValueAtom = atom(10)

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

export const PercentSecure = () => {
    const [meterValue, setMeterValue] = useAtom(meterValueAtom)


    return (
        <Box css={{ height: '400px', width: '400px', fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
            
            <Meter
                id={'security-pct-meter-label'}
                label={'% Secure'}
                showValueLabel={true}
                formatOptions={{ style: 'percent' }}
                valueLabel={`1 of 4`}
                value={meterValue}
                minValue={0}
                maxValue={100}
            />
        </Box>
    ); 
}

export const SecurityTabContent = () => {
    
    return (
        <PercentSecure />
    );
}