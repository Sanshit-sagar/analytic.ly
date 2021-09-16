import React from 'react'

const { atom, useAtom } from 'jotai'

const meterValueAtom = atom(10)

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

export const SecurityTabContent = () => {
    const [meterValue, setMeterValue] = useAtom(meterValueAtom)

    const increaseTenPct = () => setMeterValue(meterValue <= 90 ? meterValue + 10 : meterValue)
    const decreaseTenPct = () => setMeterValue(meterValue >= 10 ? meter)

    return (
        <Box css={{ height: '400px', width: '400px' }}>
            <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
                <Text> does it work ? yee </Text>
                <Meter
                    label={'% Secure'}
                    value={meterValue}

            </Flex>
        </Box>

    )
}