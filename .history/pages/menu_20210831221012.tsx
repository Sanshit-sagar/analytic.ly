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


const TimeframeTabContent = () => {
    return (
        <Text size='1' as='span'> 
            Timeframe Tab Content Here 
        </Text>
    );
}

const SlugTabContent = () => {
    return (
        <Text size='1' as='span'> 
            Slug Tab Content Here 
        </Text>
    );
}

const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useState('')

    const handleInputChange = (event: React.ChangeEventHandler<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2' as='subtitle'> Enter the Destination URL below </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> DestinationURL </Label>
                <TextField 
                    size='2' 
                    type='url'
                    variant='ghost' 
                    value={destinationInput} 
                    onChange={handleInputChange} 
                    placeholder='www.example.com'
                    css={{ width: '100%' }}
                />
            </UrlFieldSet>
        </Flex>
    );
}

const TABS_ORIENTATION = 'horizontal'
const TABS_DIRECTION = 'ltr'
]


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