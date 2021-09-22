import React from 'react'
import { styled } from '../../stitches.config'

import { useAtomValue } from 'jotai/utils'

import { destinationResultsAtom } from '../../atoms/destination'
import { expirationResultsAtom } from '../../atoms/expiration'
import { passwordResultsAtom } from '../../atoms/password'

import { ScrollArea } from '../../primitives/ScrollArea'
import { Separator } from '../../primitives/Separator'
import { Heading } from '../../primitives/Heading'
import { Button } from '../../primitives/Button'

import { Tree } from '../../compositions/Tree'

import {
    Dialog, 
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose 
} from '../../primitives/Dialog'
import { Text } from '../../primitives/Text'

import { SeoResults } from './SeoTree'
import { OpenGraphResults } from './OpenGraph'

const Wrapper = styled('div', {
    height: 'inherit',
    width: '100%',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'stretch', 
    pt: '$1',
    pl: '$2',
    border: '1px solid $border',
    borderBottom: 'none',
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

const Container = styled('div', {
    width: '100%', 
    height: '100%', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1' 
})

const UrlResults = () => {
    const urlResults = useAtomValue(destinationResultsAtom)
    return (
        <Tree name={'Destination'} defaultOpen>
            <Tree name={urlResults} defaultOpen /> 
            <OpenGraphResults /> 
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
    <Tree name={'Input Results'} defaultOpen>
        <UrlResults />
        <SeoResults /> 
        <ExpirationResults />
        <PasswordResults /> 
    </Tree>
)


const Actions = () => {
    const handleSave = () => alert('save...')

    return (
        <Dialog>
            <DialogTrigger>
                <Button onClick={handleSave}>
                    Save
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle> Input Summary </DialogTitle> 
                <DialogDescription> 
                    Create a new link with these details? 
                </DialogDescription>

                <Text> hihihi </Text>

                <DialogClose> <Button color='green'</DialogClose> 
            </DialogContent>
        </Dialog>
    );
}

const InputSummary = () => (
    <ScrollArea>
        <Wrapper>
            <SummaryHeader />
            <SummaryTree /> 
        </Wrapper>
    </ScrollArea>
)

export const InputSummaryPanel = () => {

    return (
        <Container>
            <InputSummary />
            <Actions /> 
        </Container>
    )
}



