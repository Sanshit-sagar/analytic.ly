import React from 'react'

import { NumberField } from '../../../compositions/NumberField'
import { Flex } from '../../../primitives/Flex'

export const CustomNumberField = () => {
    const [value, setValue] = React.useState<number>(0.15)
    const [valid, setValid] = React.useState<boolean>(true)

    const onChange = (v: number) => {
        if(v > 0.15) return 
        setValue(0.15)
        setValidationState
    }

    return (
        <Flex css={{ border: 'thin solid $border', bc: 'transparent' }}> 
            <NumberField
                label={'Test Field'}
                value={value}
                onChange={onChange}
                formatOptions={{
                    style: 'percent'
                }}
                minValue={0.1}
                maxValue={0.2}
                step={0.01}
                isRequired={true}
                validationState={valid}

                description="What's an email we can reach you at?"
            /> 
        </Flex> 
    );
}

// import { styled } from '../../../stitches.config'
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
