import React from 'react'

import { 
    destinationInputAtom, 
    destinationInputIsValidAtom 
} from './DestinationTab'

import {
    seoAtom, 
    seoSourceAtom,
    seoMediumAtom, 
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom,
    seoSourceAtom
} from './SeoTab'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

export const NewSlugDetailsSummary = () => {
    const source = useAtomValue(seoSourceAtom)
    const medium = useAtomValue(seoSourceAtom)
    const term = useAtomValue(seoSourceAtom)
    const content = useAtomValue(seoSourceAtom)
    const campaign = useAtomValue(seoCampaignAtom)

}

