import React from 'react'
import { styled } from '../../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'
import {
    destinationInputAtom
} from '../../../atoms/destination'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

const OutputContainer = styled('div', {
    margin: '$3', 
    padding: '$2', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    flexWrap: 'wrap', 
    gap: 0
})

const UtmSource = () => {
    const source = useAtomValue(seoSourceAtom)
    return !source?.length ? null : <Text size='4'> {`&utm_source=${source}`} </Text>;
}

const UtmMedium = () => {
    const medium = useAtomValue(seoMediumAtom)
    return !medium?.length ? null : <Text size='4'> {`&utm_medium=${medium}`}</Text>
}

const UtmContent = () => {
    const content = useAtomValue(seoContentAtom)
    return !content?.length ? null : <Text size='4'> {`&utm_content=${content}`}</Text>
}

const UtmCampaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    return !campaign?.length ? null : <Text size='4'> {`&utm_campaign=${campaign}`}</Text>
}

const UtmTerm = () => {
    const term = useAtomValue(seoTermAtom)
    return !term?.length ? null : <Text size='4'> {`&utm_term=${term}`}</Text>
}

const Destination = () => {
    const destination = useAtomValue(destinationInputAtom)
    return <Text size='3'> {!destination?.length ? 'No Destination   ' : destination} </Text>
}

export const SeoParamsOutput = () => { 

    return (
        <OutputContainr> 
            <Destination /> 
            <UtmSource /> 
            <UtmMedium />
            <UtmContent />
            <UtmCampaign />
            <UtmTerm /> 
        </OutputContainer>
    )
}