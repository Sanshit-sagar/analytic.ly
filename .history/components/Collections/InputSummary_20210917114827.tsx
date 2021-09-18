import React from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
import { 
    destinationInputAtom, isDestinationInputValidAtom } from '../../atoms/destination'
// import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Text'
import { OpenGraphResults } from '../SubMenus/DestinationTab/OpenGraph'
import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator'
import { 
    Tree, 
    ControlledTreeNodeWithInput as TreeNode, 
    ITreeNodeItem 
} from '../../compositions/Tree'

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

const node: ITreeNodeItem = { 
    id: '0',
    name: 'testNode', 
    primaryValue: '', 
    primaryField: 'url',
    placeholder: 'testPlaceholder',
    label: 'testLabel'
}

const summaryTreeNodeAtom = atom(node)
const doesExistAtom = atom(true)

const SummaryTree = () => {
    const [node, setNode] = useAtom(summaryTreeNodeAtom)
    const [exists, setExists] = useAtom(doesExistAtom)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => (
        setNode((prev: ITreeNodeItem) => { 
            return {
                ...prev, 
                primaryValue: event.currentTarget.value 
            }
        })
    )

    const handleRemove = () => !exists ? setExists(false) : console.log('cant do nuting')


    return (
        <Tree name={'slug_name'} defaultOpen>
            <Tree name={'child3'}>
                <TreeNode 
                    node={node} 
                    update={handleChange}
                    remove={handleRemove}
                />
            </Tree>
        </Tree>
    )
}

export const InputSummary = () => (
    <Wrapper>
        <Heading size='1'> Summary </Heading>
        <Separator orientation='horizontal' /> 
        <OpenGraphResults /> 
        <SummaryTree /> 
    </Wrapper>
);