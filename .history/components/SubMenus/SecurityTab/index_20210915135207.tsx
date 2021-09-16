import React from 'react'
import { styled } from '../../../stitches.config'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Meter } from '../../../compositions/Meter'

const PasswordContainer = styled('div', {
    height: '200px',
    width: '600px',
    margin: 'auto',
    paddng: '$2 $4',
    fd: 'row', 
    jc: 'center', 
    ai: 'stretch', 
    gap: '$2',
    border: '1px solid $border', 
    br: '$2',
    '&:hover': {
        borderColor: '$3',
    }
});

const meterValueAtom = atom(10)

export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

    return (
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
    ); 
}