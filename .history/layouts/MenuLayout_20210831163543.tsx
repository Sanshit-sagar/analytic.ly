import React, { ReactNode } from 'react'

import { ScrollArea } from '../primitives/ScrollArea'
import { Flex } from '../primitives/Flex'
import { MenuWrapper } from '../primitives/Shared'

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