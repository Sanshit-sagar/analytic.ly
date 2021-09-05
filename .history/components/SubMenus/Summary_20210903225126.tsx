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
} from './SeoTab'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

export const NewSlugDetailsSummary = () => {
    const source = useAtomValue(seoSourceAtom)
    const medium = useAtomValue(seoMediumAtom)
    const term = useAtomValue(seoTermAtom)
    const content = useAtomValue(seoContentAtom)
    const campaign = useAtomValue(seoCampaignAtom)

}

