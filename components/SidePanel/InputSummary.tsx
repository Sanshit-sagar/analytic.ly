import React from 'react'
import { styled } from '../../stitches.config'

import { useAtomValue } from 'jotai/utils'

import { destinationResultsAtom } from '../../atoms/destination'
import { expirationResultsAtom } from '../../atoms/expiration'
import { passwordResultsAtom } from '../../atoms/password'

import { ScrollArea } from '../../primitives/ScrollArea'
import { Separator } from '../../primitives/Separator'
import { Heading } from '../../primitives/Heading'
import { Tree } from '../../compositions/Tree'

import { SeoResults } from './SeoSummary'

const Header = styled('div', {
    mb: '$2', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1'
});

const Container = styled('div', {
    width: '100%', 
    height: '380px', 
    fd: 'column', 
    jc: 'space-between', 
    ai: 'stretch', 
    gap: '$1',
    bc: 'transparent',
    pl: '$2'
})


const UrlResults = () => {
    const urlResults = useAtomValue(destinationResultsAtom)
    return (
        <Tree name={'Destination'} level={2}>
            <Tree name={urlResults} level={3} /> 
        </Tree>
    );
}
const ExpirationResults = () => {
    const expirationResults = useAtomValue(expirationResultsAtom)
    return (
        <Tree name={'Expiration'} level={2}>
            <Tree name={expirationResults} level={3} /> 
        </Tree>
    );
}
const PasswordResults = () => {
    const passwordResults = useAtomValue(passwordResultsAtom)
    return (
        <Tree name={'Password'} level={2}>
            <Tree name={passwordResults} level={3} />
        </Tree>
    );
}

const SummaryHeader = () => (
    <Header>
        <Heading> Summary </Heading>
        <Separator />
    </Header>
)

export const SummaryTree = () => (
    <Tree name={'Input Results'} level={1} defaultOpen>
        <UrlResults />
        <SeoResults /> 
        <ExpirationResults />
        <PasswordResults /> 
    </Tree>
)

export const InputSummary = () => (
    <ScrollArea>
        <Container>
            <SummaryHeader />
            <SummaryTree /> 
        </Container>
    </ScrollArea>
)



