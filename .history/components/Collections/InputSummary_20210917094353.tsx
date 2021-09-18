import React from 'react'
import { styled } from '../../stitches.config'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator'
import { Tree } from '../../compositions/Tree'

const Wrapper = styled('div', {
    height: '100%',
    width: '100%',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$2'
});

const InputSummary = () => {

    return (
        <Wrapper>
            <Heading size='1'> Summary </Heading>
            <Separator orientation='horizontal' /> 
        </Wrapper>
    )

}