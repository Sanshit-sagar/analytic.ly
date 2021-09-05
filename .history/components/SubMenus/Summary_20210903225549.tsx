import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { 
    destinationInputAtom, 
    destinationInputIsValidAtom 
} from './DestinationTab'

import {
    seoSourceAtom,
    seoMediumAtom, 
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from './SeoTab'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

const Datum = (atomName: string, atomValue: string | number | boolean | undefined) => {
    return (
        <Text size='1' css={{ color: '$text' }}>
            {atomName.toUpperCase()}
        </Text>
    )
}

export const NewSlugDetailsSummary = () => {
    const source = useAtomValue(seoSourceAtom)
    const medium = useAtomValue(seoMediumAtom)
    const term = useAtomValue(seoTermAtom)
    const content = useAtomValue(seoContentAtom)
    const campaign = useAtomValue(seoCampaignAtom)

    const destination = useAtomValue(destinationInputAtom)
    const isDestinationValid = useAtomValue(destinationInputIsValidAtom)

    return (

        <Box css={{ border: 'thin solid', borderColor: '$hiContrast', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>


            </Flex>
        </Box>

    )
}

