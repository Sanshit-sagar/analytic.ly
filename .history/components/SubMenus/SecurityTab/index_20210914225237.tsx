import React from 'react'
import { atom, useAtom } from 'jotai'

const meterValueAtom = atom(10)

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

export const SecurityTabContent = () => {
    const [meterValue, setMeterValue] = useAtom(meterValueAtom)

    const increaseTenPct = () => setMeterValue(meterValue <= 90 ? meterValue + 10 : 100)
    const decreaseTenPct = () => setMeterValue(meterValue >= 10 ? meterValue - 10 : 0)
    const increaseBy = (amt: number) => setMeterValue(meterValue <= (100-amt) ? meterValue + amt : 100)
    const decreaseBy = (amt: number) => setMeterValue(meterValue >= amt ? meterValue - amt : 0)

    return (
        <Box css={{ height: '400px', width: '400px' }}>
            <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
                <Text> does it work ? yee </Text>
                <Meter
                    label={'% Secure'}
                    value={meterValue}
                    showValueLabel={true}
                    formatOptions={style: 'percent'}
                    valueLabel={}

            </Flex>
        </Box>

    )
}