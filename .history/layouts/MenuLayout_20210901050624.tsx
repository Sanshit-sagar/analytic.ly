import React, { ReactNode } from 'react'

import { Flex } from '../primitives/Flex'
import { DashboardLayoutRow } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import Header from '../components/Header'

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
                     </MenuWrapper>
                     <Statistics /> 
                </DashboardLayoutRow>
            </Flex>
        </ScrollArea>               
    )
}

export default MenuLayout 