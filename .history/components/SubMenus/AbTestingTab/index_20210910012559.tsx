import React from 'react'

import { styled } from '../../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Box } from '../../../primitives/Box'

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

    return (
        <AbTestingContainer>
            <NumberField />
        </AbTestingContainer>
    )
}

export default AbTestingTab