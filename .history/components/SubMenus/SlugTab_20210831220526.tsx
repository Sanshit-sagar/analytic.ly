import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'

export const SlugTabContent = () => {

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'>
                Enter the Destination URL below 
            </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
               <Label>  </Label>
            

            </UrlFieldSet>
        </Flex>
    )   
}

