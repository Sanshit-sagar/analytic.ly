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
import { Flex } from '../../primitives/Flex'
import {
    Dialog, 
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogActions,
    DialogTriggerButton
} from '../../primitives/Dialog'

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
        <Tree name={'Destination'}>
            <Tree name={urlResults} /> 
        </Tree>
    );
}
const ExpirationResults = () => {
    const expirationResults = useAtomValue(expirationResultsAtom)
    return (
        <Tree name={'Expiration'}>
            <Tree name={expirationResults} /> 
        </Tree>
    );
}
const PasswordResults = () => {
    const passwordResults = useAtomValue(passwordResultsAtom)
    return (
        <Tree name={'Password'}>
            <Tree name={passwordResults} />
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

    return (
        <Dialog>
            <Flex css={{ zIndex: 10 }}>
                <DialogTrigger>
                    <DialogTriggerButton>
                        Save
                    </DialogTriggerButton>
                </DialogTrigger> 
            </Flex>

            <DialogContent>
                <DialogTitle> Input Summary </DialogTitle> 
                <DialogDescription> 
                    Create a new link with these details? 
                </DialogDescription>

                <ScrollArea>
                    <InputSummary /> 
                </ScrollArea>

                <DialogActions> 
                    <DialogClose>
                        <DialogTriggerButton> 
                            Save 
                        </DialogTriggerButton>
                    </DialogClose>
                </DialogActions> 

            </DialogContent>
        </Dialog>
    );
}

const SubmissionUrl = () => {
    let url = useSubmit() 
    return (
        <Box css={{ border: 'thin solid black', width: '400px', display: 'flex', fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            
            <Text size='3'> {url} </Text> 

        </Box>
    );
}

const InputSummary = () => (
    <Container>
        <SummaryHeader />
        <SummaryTree /> 
    </Container>
)

export const InputSummaryPanel = () => {

    return (
        
        <ScrollArea>
            <InputSummary />
            <Actions />
        </ScrollArea>
        
    )
}



