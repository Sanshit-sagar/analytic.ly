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
    const [value, setValue] = React.useState<number>(0.15)
    
    const onChange = (v: number) => setValue(v)

    const formatOptions: Intl.NumberFormatOptions = {{
        style: 'percent'
      }}

    return (
        <Flex css={{ border: 'thin solid $border', bc: 'transparent' }}> 
            <NumberField
                value={value}
                onChange={onChange}
                formatOptions={formatOptions}
                minValue={0.1}
                maxValue={0.2}
                step={0.01}
            /> 
        </Flex> 
    )
}

// const ControlGroup = () => {}