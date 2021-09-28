import React from 'react'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Meter } from '../../../compositions/Meter'

import { Text } from '../../../primitives/Text'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'
import { InfoCircledIcon } from '@radix-ui/react-icons'

const meterValueAtom = atom(10)

export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

    return (
       
        <Meter
            id={'security-pct-meter-label'}
            label={'ENCRYPTION'}
            showValueLabel={true}
            formatOptions={{ style: 'percent' }}
            valueLabel={`1 of 4`}
            value={meterValue}
            minValue={0}
            maxValue={100}
        />
    ); 
}