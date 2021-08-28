import React from 'react'

import { ScrollArea } from '../../primitives/ScrollArea'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import Header from '../Header'
import Statistics from '../Statistics'
import Timeseries from '../Timeseries'
import GroupedBars from '../Bars'
import PieChart from '../Pie'
import Curve from '../Curve'

import { useUpdateAtom, useAtom, atom } from 'jotai'

const Dashboard = () => {

    return (
        <Layout 
            mainComponent={<Timeseries />}
            sidebarComponent={<Statistics />}
            visualComponent1={<PieChart />}
            visualComponent2={<GroupedBars />}
        />
    )
}

const Layout = ({ mainComponent, sidebarComponent, visualComponent1, visualComponent2 }) => {

    return (
        <ScrollArea>
            <Flex css={{ bc: 'transparent',fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <Flex css={{ bc: 'transparent', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1'}}>
                    {mainComponent}
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                        <Header />
                        {sidebarComponent}
                    </Flex>
                </Flex>
                <Flex css={{ bc: 'transparent', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1', margin: '$1 $2' }}>
                    {visualComponent1}
                    {visualComponent2}
                </Flex>
            </Flex>
        </ScrollArea>
    )
}

export default Dashboard