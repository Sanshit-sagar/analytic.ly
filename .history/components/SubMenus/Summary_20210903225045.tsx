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

}

