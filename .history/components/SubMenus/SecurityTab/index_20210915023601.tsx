import React from 'react'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Box } from '../../../primitives/Box'
import { Meter } from '../../../compositions/Meter'

const meterValueAtom = atom(10)

export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

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