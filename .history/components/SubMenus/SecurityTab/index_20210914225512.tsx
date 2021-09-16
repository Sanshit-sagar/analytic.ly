import React from 'react'
import { atom, useAtom } from 'jotai'
import { Meter } from '../../../compositions/Meter'

const meterValueAtom = atom(10)

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

export const PercentSecure = () => {
    const [meterValue, setMeterValue] = useAtom(meterValueAtom)

    // const increaseTenPct = () => setMeterValue(meterValue <= 90 ? meterValue + 10 : 100)
    // const decreaseTenPct = () => setMeterValue(meterValue >= 10 ? meterValue - 10 : 0)
    // const increaseBy = (amt: number) => setMeterValue(meterValue <= (100-amt) ? meterValue + amt : 100)
    // const decreaseBy = (amt: number) => setMeterValue(meterValue >= amt ? meterValue - amt : 0)

    return (
        <Box css={{ height: '400px', width: '400px' }}>
            <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
                <Text> does it work ? yee </Text>
                <Meter
                    id={'security-pct-meter-label'}
                    label={'% Secure'}
                    value={meterValue}
                    showValueLabel={true}
                    formatOptions={{ style: 'percent' }}
                    valueLabel={`1 of 4`}
                    value={meterValue}
                    minValue={0}
                    maxValue={100}
                />
            </Flex>
        </Box>
    ); 
}

export const SecurityTabContent = () => (
    <PercentSecure /> 
)