import React from 'react'
import { styled } from '../../stitches.config'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Heading'
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
    gap: '$2',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
});

const SummaryTree = () => {

    return (
        <Tree name={'slug_name'} defaultOpen>
            <Tree name={'child1'} />
            <Tree name={'child2'}>
                <Text css={{ 'color': '$funky' }}> testing </Text>
            </Tree>
        </Tree>
    )
}

export const InputSummary = () => (
    <Wrapper>
        <Heading size='1'> Summary </Heading>
        <Separator orientation='horizontal' /> 
        <SummaryTree /> 
    </Wrapper>
);