import React from 'react'
import { useAtomValue } from 'jotai/utils'

import {
    seoSourceAtom, 
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom,
    utmStrAtom
} from '../../atoms/urchins'

const Source = () => {
    const source = useAtomValue(seoSourceAtom)
    return <Tree name={`Source: ${source}`} />;
}

const Medium = () => {
    const medium = useAtomValue(seoMediumAtom)
    return <Tree name={`Medium: ${medium}`}
}

const SeoResults = () => {
   
    const medium = useAtomValue(seoMediumAtom)
    const term = useAtomValue(seoTermAtom)
    const content = useAtomValue(seoContentAtom)
    const campaign = useAtomValue(seoCampaignAtom)
    const utmStr = useAtomValue(utmStrAtom)

    return (
        
    )
}

