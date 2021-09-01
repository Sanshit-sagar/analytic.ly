import React from 'react'

import { TextField } from '../primitives/TextField'
import { Container } from '../primitives/Container'
import { Heading } from '../primitives/Heading'
import { Button } from '../primitives/Button'
import { Text } from '../primitives/Text'
import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { 
    Tabs, 
    TabsList, 
    TabsTrigger, 
    TabsContent 
} from '../primitives/Tabs'

const Menu = () => {

    return (
        <Box css={{ }}>
            <Tabs defaultValue="tab1">
                <TabsList aria-label={`tabs-list-menu`} 

            </Tabs>
        </Box>   
    )

}

export default Menu;