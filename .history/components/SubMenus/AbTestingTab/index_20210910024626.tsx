import React, { useRef } from 'react'

import { styled } from '../../../stitches.config'

import { Text } from '../../../primitives/Text'
import { NumberField } from '../../../compositions/NumberField'

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'center', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});

const AB_TESTING_LABEL = 'AB Testing'


const AbTestingTab = () => {
  
    const inputRef = useRef<HTMLInputElement>()

    return (
        <AbTestingContainer>
            <NumberField 
                label={AB_TESTING_LABEL} 
                inputRef={inputRef} 
            />
            <Text> {JSON.stringify(inputRef.current)} </Text>
        </AbTestingContainer>
    )
}

export default AbTestingTab