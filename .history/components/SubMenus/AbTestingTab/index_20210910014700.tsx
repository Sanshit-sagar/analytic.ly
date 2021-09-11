import React, { useRef } from 'react'

import { styled } from '../../../stitches.config'

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

const AbTestingTab = () => {
    const label = ''
    const inputRef = useRef<HTMLInputElement>()
    const incrRef = useRef<HTMLElement>();
    const decrRef = useRef<HTMLElement>();

    return (
        <AbTestingContainer>
            <NumberField label={'Testing'} inputRef={inputRef} />
        </AbTestingContainer>
    )
}

export default AbTestingTab