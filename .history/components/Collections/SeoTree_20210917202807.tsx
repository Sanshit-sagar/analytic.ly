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


const SeoResults = () => {
    const source = useAtomValue(seoSourceAtom)
    const medium = useAtomValue(seoMediumAtom)
    const term = useAtomValue(seoTermAtom)
    const content = useAtomValue(seoContentAtom)
    const campaign = useAtomValue(seoCampaignAtom)
    const utmStr = useAtomValue(utmStrAtom)

    return (
        
    )
}
