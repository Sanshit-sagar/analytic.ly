import React, { ReactNode } from 'react'

import { Flex } from '../primitives/Flex'
import { MenuWrapper } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import Header from '../components/Header'

interface IMenuLayoutProps {
    children: ReactNode; 
}

const MenuLayout = ({ children }: IMenuLayoutProps) => {

    return (
        
        <ScrollArea>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$3' }}></Flex>
            <Header />

            <MenuWrapper>
                {children}
            </MenuWrapper>
        </ScrollArea>               
    )
}

export default MenuLayout 