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
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
                <Header />

                <MenuWrapper>
                    {children}
                </MenuWrapper>
            </Flex>
        </ScrollArea>               
    )
}

export default MenuLayout 