import React from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
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

const summaryTreeNodeAtom = atom()
const doesExistAtom = atom(true)

const SummaryTree = () => {
    const [value, setValue] = useAtom(summaryTreeAtom)
    const [exists, setExists] = useAtom(doesExistAtom)

    const handleChange = (updatedValue: string) => setValue(updatedValue)
    const handleRemove = () => !exists ? setExists(false) : console.log('cant do nuting')
    
    const node = { name: 'testNode', value: '', update: (value: string) => handleChange(value), remove: handleRemove(),  }

    return (
        <Tree name={'slug_name'} defaultOpen>
            <Tree name={'child1'} />
            <Tree name={'child2'}>
                <Text size='1' css={{ 'color': '$funky' }}> testing </Text>
            </Tree>
            <TreeNode 
                node={value} 
                update={handleChange}
                remove={handleRemove}
            />
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