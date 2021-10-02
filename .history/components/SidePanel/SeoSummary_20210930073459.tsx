import React from 'react'
import { useAtomValue } from 'jotai/utils'

import { Tree } from '../../compositions/Tree'

import {
    seoSourceAtom, 
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../atoms/urchins'

const Source = () => {
    const source = useAtomValue(seoSourceAtom)
    return <Tree name={`Source: ${source}`} level={2} defaultOpen />
}

const Medium = () => {
    const medium = useAtomValue(seoMediumAtom)
    return <Tree name={`Medium: ${medium}`} level={2} defaultOpen />
}

const Content = () => {
    const content = useAtomValue(seoContentAtom)
    return <Tree name={`Content: ${content}`} level={2} defaultOpen />
}

const Term = () => {
    const term = useAtomValue(seoTermAtom)
    return <Tree name={`Term: ${term}`} level={2} defaultOpen />
}

const Campaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    return <Tree name={`Campaign: ${campaign}`} level={3} defaultOpen />
}

export const SeoResults = () => (
    <Tree level={2} name={`SEO Parameters`}>
        <Source />
        <Medium />
        <Term />
        <Content />
        <Campaign /> 
    </Tree>
);


