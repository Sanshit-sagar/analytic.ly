import React, { ReactNode } from 'react'

import { Flex } from '../primitives/Flex'
import { ScrollArea } from '../primitives/ScrollArea'
import { DashboardLayoutRow } from '../primitives/Shared'

import Header from '../components/Header'
import Statistics from '../components/Statistics'

interface IMenuLayoutProps {
    children: ReactNode; 
}

const MenuLayout = ({ children }: IMenuLayoutProps) => {

    return ( 
        <ScrollArea>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$3' }}>
                <Header />

                <DashboardLayoutRow> 
                    {children}
                     <Statistics /> 
                </DashboardLayoutRow>
            </Flex>
        </ScrollArea>               
    )
}

export default MenuLayout 