import React from 'react'



import { NumberField } from '../../../compositions/NumberField'
import { Flex } from '../../../primitives/Flex'

export const CustomNumberField = () => {
    const [value, setValue] = React.useState<number>(0.15)
    
    const onChange = (v: number) => setValue(v)

    return (
        <Flex css={{ border: 'thin solid $border', bc: 'transparent' }}> 
            <NumberField
                value={value}
                onChange={onChange}
                formatOptions={{
                    style: 'percent'
                }}
                minValue={0.1}
                maxValue={0.2}
                step={0.01}
            /> 
        </Flex> 
    )
}

// import { Text } from '../../../primitives/Text'
// import { Icon } from '../../../primitives/Icon'

// const NumberFieldControlGroup = styled('fieldset', {

// })

// const NumberFieldLabel = styled('label', {

// })

// const StyledNecessityIndicatorText = styled(Text, {

// })

// const StyledNecessityIndicatorIcon = styled(Icon, {

// })
