import React from 'react'

import { ScrollArea } from '../primitives/ScrollArea'
import { Flex } from '../primitives/Flex'
import { Header } from '../components/Header'
import { MenuWrapper } from '../primitives/Shared'

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