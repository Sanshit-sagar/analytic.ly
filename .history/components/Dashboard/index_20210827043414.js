import React from 'react'

import { ScrollArea } from '../../primitives/ScrollArea'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import Timeseries from '../Timeseries'
import Curve from '../Curve'
import PieChart from '../Pie'


import { useUpdateAtom, useAtom, atom } from 'jotai'

const Dashboard = () => {

    return (
        <ScrollArea>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1'}}>        
                <Timeseries />
                <Curve />
            </Flex>
            <PieChart />
        </ScrollArea>
    )
}

export default Dashboard