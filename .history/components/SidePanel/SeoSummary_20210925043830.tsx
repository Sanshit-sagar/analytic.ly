import React from 'react'
import { useAtomValue } from 'jotai/utils'

import { Tree } from '../../compositions/Tree'
import { Text } from '../'
import { ModalDialog } from '../Dialog'
import {
    seoSourceAtom, 
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../atoms/urchins'

const Source = () => {
    const source = useAtomValue(seoSourceAtom)
    return <Tree name={`Source: ${source}`} defaultOpen />
}

const Medium = () => {
    const medium = useAtomValue(seoMediumAtom)
    return <Tree name={`Medium: ${medium}`} defaultOpen />
}

const Content = () => {
    const content = useAtomValue(seoContentAtom)
    return <Tree name={`Content: ${content}`} defaultOpen />
}

const Term = () => {
    const term = useAtomValue(seoTermAtom)
    return <Tree name={`Term: ${term}`} defaultOpen />
}

const Campaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    return <Tree name={`Campaign: ${campaign}`} defaultOpen />
}

export const SeoResults = () => (
    <Tree name={`SEO Parameters`} defaultOpen>
        <Source />
        <Medium />
        <Term />
        <Content />
        <Campaign /> 

        <ModalDialog>
            <Text size='2'> Open Me! </Text>
        </ModalDialog>
    </Tree>
);


