import React from 'react'

import { ScrollArea } from '../primitives/ScrollArea'
import { Flex } from '../primitives/Flex'
import { Header } from '../components/Header'
import { MenuWrapper }

const MenuLayout = ({ children }) => {

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