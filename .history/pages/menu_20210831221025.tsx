import React, { useState } from 'react'

import { AppContainer } from '../primitives/Shared'
import MenuLayout from '../layouts/MenuLayout'

import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { Icon } from '../primitives/Icon'
import { UrlFieldSet, Label } from '../primitives/FieldSet'
import { Button } from '../primitives/Button'
import { Heading } from '../primitives/Heading'
import { TextField } from '../primitives/TextField'
import { Separator } from '../primitives/Separator'

import { 
    Tabs, 
    TabsList, 
    TabsTrigger, 
    TabsContent 
} from '../primitives/Tabs'

import { 
    TargetIcon,
    Link2Icon,
    ClockIcon
} from '@radix-ui/react-icons'





Menu.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <MenuLayout> 
                {page} 
            </MenuLayout>
        </AppContainer>
    )
}


export default Menu;