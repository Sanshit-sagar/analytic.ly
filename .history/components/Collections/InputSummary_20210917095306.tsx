import React from 'react'
import { styled } from '../../stitches.config'

import { useAtom } from 'jotai'
// import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator'
import { Tree, ControlledTreeNodeWithInput as TreeNode } from '../../compositions/Tree'

const Wrapper = styled('div', {
    height: '100%',
    width: '100%',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$2',
    pt: '$1',
    pl: '$1',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
});

const summaryTreeAtom = atom('')

const SummaryTree = () => {
    const [value, setValue] = useAtom(summaryTreeAtom)

    const handleChange = (updatedValue: string) => setValue(updatedValue)

    return (
        <Tree name={'slug_name'} defaultOpen>
            <Tree name={'child1'} />
            <Tree name={'child2'}>
                <Text size='1' css={{ 'color': '$funky' }}> testing </Text>
            </Tree>
            <TreeNode 
                value={value} onChange={handleChange}
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