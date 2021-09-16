import React from 'react'
import { styled } from '../../../stitches.config'
import { useSpring, animated } from '@react-spring/web'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Meter } from '../../../compositions/Meter'

const meterValueAtom = atom(10)

export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

    return (
        <animatived.div>
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
        <
    ); 
}