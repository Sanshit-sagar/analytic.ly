import React from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { 
    destinationInputAtom, 
    isDestinationInputValidAtom 
} from '../../atoms/destination'


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

const urlResultsAtom = atom((get) => `URL: ${get(destinationInputAtom)}`)
const expirationResultsAtom = atom((get) => `Exp`)

const SummaryTree = () => {
    const urlResults = useAtomValue(urlResultsAtom)
    const expirationResults = useAtomValue(expirationResultsAtom)

    return (
        <Tree name={'Input'} />
            <Tree name={urlResults} />
            <Tree name={url}
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