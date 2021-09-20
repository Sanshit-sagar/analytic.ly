import React from 'react'

import { NumberField } from '../../../compositions/NumberField'
import { Flex } from '../../../primitives/Flex'

export const CustomNumberField = () => {
    const [value, setValue] = React.useState<number>(0.15)
    const [valid, setValid] = React.useState<boolean | undefined>(true)

    React.useEffect(() => {
        setValid(valid)
    }, [])

    const onChange = (v: number) => {
        if(v > 0.15) return 
        setValue(0.15)
        setValid={true} 
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
                step={0.01}
                minValue={0.1}
                maxValue={0.2}
                isRequired={true}
                validationState={step > 0.15 ? true : 'false'}
                description="What's an email we can reach you at?"
                placeholder='dont talk stay sa'
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
