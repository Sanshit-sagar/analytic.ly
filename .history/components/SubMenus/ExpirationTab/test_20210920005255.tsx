import React from 'react'

import { styled } from '../../../stitches.config'

import { NumberField } from '../../../compositions/NumberField'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'
import { Icon } from '../../../primitives/Icon'

// const NumberFieldControlGroup = styled('fieldset', {

// })

// const NumberFieldLabel = styled('label', {

// })

// const StyledNecessityIndicatorText = styled(Text, {

// })

// const StyledNecessityIndicatorIcon = styled(Icon, {

// })

export const NumberField = () => {


    return (
        <Flex css={{ border: 'thin solid $border', bc: 'transparent' }}> 
            <NumberField
        </Flex> 
    )
}

// const ControlGroup = () => {}