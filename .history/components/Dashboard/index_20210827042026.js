import React from 'react'

import { ScrollArea } from '../../primitives/ScrollArea'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import Timeseries from '../Timeseries'

import { useUpdateAtom, useAtom, atom } from 'jotai'

const Dashboard = () => {

    return (
        <ScrollArea>
        <Timeseries />
        </ScrollArea>
    )
}

export default Dashboard