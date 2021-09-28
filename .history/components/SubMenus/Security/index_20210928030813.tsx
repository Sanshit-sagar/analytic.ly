import React from 'react'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Meter } from '../../../compositions/Meter'

import { Text } from '../../../primit'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'

const meterValueAtom = atom(10)

export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

    return (
        <CentralControlGroup>
             <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
                    <> Destination URL </>
                    <InfoCircledIcon />
                </Text>
            </Label>
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
        </CentralControlGroup>
    ); 
}