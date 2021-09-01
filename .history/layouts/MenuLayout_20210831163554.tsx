import React, { ReactNode } from 'react'

import { Flex } from '../primitives/Flex'
import { ScrollArea } from '../primitives/ScrollArea'
import { MenuWrapper } from '../primitives/Shared'
import Header from '../components/Header'

interface IMenuLayoutProps {
    children: ReactNode; 
}

const MenuLayout = ({ children }: IMenuLayoutProps) => {

    return (
        <ScrollArea>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <Header />

                <MenuWrapper>
                    {children}
                </MenuWrapper>
            </Flex>
        </ScrollArea>               
    )
}

export default MenuLayout 