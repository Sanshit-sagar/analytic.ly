import React from 'react'
import { styled } from '../../stitches.config'

import { useAtomValue } from 'jotai/utils'

import { destinationResultsAtom } from '../../atoms/destination'
import { expirationResultsAtom } from '../../atoms/expiration'
import { passwordResultsAtom } from '../../atoms/password'

import { Separator } from '../../primitives/Separator'
import { Heading } from '../../primitives/Heading'
import { Tree } from '../../compositions/Tree'

import { SeoResults } from './SeoTree'
import { OpenGraphResults } from './OpenGraph'

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

const Header = styled('div', {
    mb: '$2', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1'
});

const UrlResults = () => {
    const urlResults = useAtomValue(destinationResultsAtom)
    return (
        <Tree name={'Destination'} defaultOpen>
            <Tree name={urlResults} defaultOpen /> 
            <Tree name={'Open Graph'} defaultOpen>
                <OpenGraphResults /> 
            </Tree>
        </Tree>
    );
}
const ExpirationResults = () => {
    const expirationResults = useAtomValue(expirationResultsAtom)
    return (
        <Tree name={'Expiration'} defaultOpen>
            <Tree name={expirationResults} defaultOpen /> 
        </Tree>
    );
}
const PasswordResults = () => {
    const passwordResults = useAtomValue(passwordResultsAtom)
    return (
        <Tree name={'Password'} defaultOpen>
            <Tree name={passwordResults} defaultOpen />
        </Tree>
    );
}

const SummaryHeader = () => (
    <Header>
        <Heading> Summary </Heading>
        <Separator />
    </Header>
)

const SummaryTree = () => (
    <Tree name={'Input Results'}>
        <UrlResults />
        <SeoResults /> 
        <ExpirationResults />
        <PasswordResults /> 
    </Tree>
)

export const InputSummary = () => (
    <Wrapper>
        <SummaryHeader />
        <SummaryTree /> 
    </Wrapper>
);