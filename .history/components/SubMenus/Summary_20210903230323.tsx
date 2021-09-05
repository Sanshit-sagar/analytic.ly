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

import { useAtomValue } from 'jotai/utils'

type AtomValueType = string | number | boolean | undefined

interface Datum {
    name: string;
    value: AtomValueType
}

const Datum = ({ key, datum }: { key: string | number; datum: Datum }) => {
    return (
        <Text
             as='span' 
             key={key} 
             size='1' 
             css={{ color: '$text' }}>
            {datum.name}: {datum.value}
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

    const data: Datum[] = [
        { name: 'source', value: source, },
        { name: 'medium', value: medium, },
        { name: 'term', value: term, },
        { name: 'content', value: content, },
        { name: 'campaign', value: campaign, },
        { name: 'destination', value: destination, },
        { name: 'destinationValid', value: isDestinationValid },
    ]

    return (

        <Box css={{ border: 'thin solid', borderColor: '$hiContrast', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                {data.map((datum: Datum, i: number) => {
                    return (
                        <Datum 
                            key={`datum-${i}`} 
                            datum={datum} 
                        />
                    );
                })}
            </Flex>
        </Box>

    )
}

