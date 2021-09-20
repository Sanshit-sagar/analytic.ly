import React from 'react'

import { NumberField } from '../../../compositions/NumberField'
import { Flex } from '../../../primitives/Flex'

export const CustomNumberField = () => {
    const [step, setStep] = React.useState<number>(0.01)
    const [minValue, setMinValue] = React.useState<number>(.10)
    const [maxValue, setMaxValue] = React.useState<number>(.20)
    const [value, setValue] = React.useState<number>(0.15)
    const [valid, setValid] = React.useState<boolean | undefined>(undefined)

    const validate = () => setValid(true)
    const invalidate = () => setValid(false)

    const incrStep = () => setStep(step + 1)
    const decrStep = () => setStep(step - 1)
    
    const incrMinValue = () => setMinValue(minValue + 1)
    const decrMinValue = () => setMinValue(minValue - 1)

    const incrMaxValue = () => setMaxValue(maxValue + 1)
    const decrMaxValue = () => setMaxValue(maxValue - 1)


    React.useEffect(() => validate(), [])

    return (
        <Flex css={{ border: 'thin solid $border', bc: 'transparent' }}> 
            <NumberField
                label={'Test Field'}
                description={'Whats an email we can reach you at?'}
                placeholder={'www.example@email.com'}
                errorMessage={'Uh oh, that does not look right'}
                value={value}
                onChange={(v: number) => setValue(v)}
                formatOptions={{
                    style: 'percent'
                }}
                step={step}
                minValue={minValue}
                maxValue={maxValue}
                isRequired={true}
                validationState={step > 0.15 ? true : 'false'}
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
