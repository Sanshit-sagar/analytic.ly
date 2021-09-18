import React from 'react'
import { styled } from '../../stitches.config'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { destinationResultsAtom } from '../../atoms/destination'
import { passwordAtom, isPasswordValidAtom } from '../../atoms/password'
import { fromDateAtom } from '../../atoms/expiration'

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


const expirationResultsAtom = atom((get) => `Duration: ${get(fromDateAtom)}`)


const UrlResults = () => {
    const urlResults = useAtomValue(destinationResultsAtom)
    return <Tree name={urlResults} /> 
}
const ExpirationResults = () => {
    const expirationResults = useAtomValue(expirationResultsAtom)
    return <Tree name={expirationResults} /> 
}
const PasswordResults = () => {
    const passwordResults = useAtomValue(passwordResultsAtom)
    return <Tree name={passwordResults} />
}

const SummaryTree = () => (
    <Tree name={'Input'}>
        <UrlResults />
        <ExpirationResults />
        <PasswordResults /> 
    </Tree>
);

const SummaryHeader = () => (
    <Header>
        <Heading size='1'> Summary </Heading>
        <Separator orientation='horizontal' />
    </Header>
)

export const InputSummary = () => (
    <Wrapper>
        <SummaryHeader />
        <SummaryTree /> 
    </Wrapper>
);