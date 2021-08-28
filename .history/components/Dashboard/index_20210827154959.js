import React from 'react'

import { ScrollArea } from '../../primitives/ScrollArea'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import Header from '../Header'
import Timeseries from '../Timeseries'
import Curve from '../Curve'
import PieChart from '../Pie'
import GroupedBars from '../Bars'
import Statistics from '../Statistics'


import { useUpdateAtom, useAtom, atom } from 'jotai'

const Dashboard = () => {

    return (
        <ScrollArea>
            <Flex css={{ bc: 'transparent',fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <Flex css={{ bc: 'transparent', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1'}}>        
                    <Timeseries />
                    <
                    <Header />
                </Flex>
                <Flex css={{ bc: 'transparent', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1', margin: '$1 $2' }}>
                    <PieChart />
                    <GroupedBars />
                </Flex>
            </Flex>
        </ScrollArea>
    )
}

export default Dashboard