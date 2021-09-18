import React from 'react'
import { useAtomValue } from 'jotai/utils'

import { Tree } from '../../compositions/Tree'

import {
    seoSourceAtom, 
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
    // utmStrAtom
} from '../../atoms/urchins'

const Source = () => {
    const source = useAtomValue(seoSourceAtom)
    return <Tree name={`Source: ${source}`} />;
}

const Medium = () => {
    const medium = useAtomValue(seoMediumAtom)
    return <Tree name={`Medium: ${medium}`} />;
}

const Content = () => {
    const content = useAtomValue(seoContentAtom)
    return <Tree name={`Content: ${content}`} />;
}

const Term = () => {
    const term = useAtomValue(seoTermAtom)
    return <Tree name={`Term: ${term}`} /> 
}

const Campaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    return <Tree name={`Campaign: ${campaign}`} />
}

export const SeoResults = () => (
    <Tree name={`SEO Parameters`} defaultOpen>
        <Source />
        <Medium />
        <Term />
        <Content />
        <Campaign /> 
    </Tree>
);


