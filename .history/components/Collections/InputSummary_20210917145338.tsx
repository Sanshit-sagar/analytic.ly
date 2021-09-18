import React from 'react'
import { styled } from '../../stitches.config'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { destinationInputAtom, isDestinationInputValidAtom } from '../../atoms/destination'
import { fromDateAtom } from '../../atoms/expiration'
import { passwordAtom, isPasswordValidAtom } from '../../atoms/password'

import { OpenGraphResults } from '../SubMenus/DestinationTab/OpenGraph'

import { Text } from '../../primitives/Text'
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

const urlValidAtom = atom((get) => `${get(isDestinationInputValidAtom) ? 'ye' : 'ne'}`)
const urlResultsAtom = atom((get) => `URL(${get(urlValidAtom)}: ${get(destinationInputAtom).substring(0,20)}`)

const slugResultsAtom = atom((get) => `Slug: ${get(slugAtom)}`)
const expirationResultsAtom = atom((get) => `Duration: ${get(fromDateAtom)}`)

const passwordValidityAtom = atom((get) => `Password:`)
const passwordResultsAtom = atom((get) => `Password: ${get(passwordAtom)}`)


const SummaryTree = () => {
    const urlResults = useAtomValue(urlResultsAtom)
    const expirationResults = useAtomValue(expirationResultsAtom)
    const passwordResults = useAtomValue(passwordResultsAtom)
    const slugResults = useAtomValue(slugResultsAtom)

    return (
        <Tree name={'Input'}>
            <Tree name={urlResults} />
            <Tree name={slugResults} /> 
            <Tree name={expirationResults} />
            <Tree name={passwordResults} />
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