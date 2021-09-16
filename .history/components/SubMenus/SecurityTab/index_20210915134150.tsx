import React from 'react'
import { styled } from '../../../stitches.config'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Meter } from '../../../compositions/Meter'

const meterValueAtom = atom(10)

export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

    return (
        <Box css={{ height: '400px', width: '400px', border: 'thin solid $border', fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
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