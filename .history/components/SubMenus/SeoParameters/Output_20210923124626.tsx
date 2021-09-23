import React from 'react'
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

const UtmSource = () => {
    const source = useAtomValue(seoSourceAtom)
    if(!source?.length) return null
    return <Text size='4'> {`&utm_source=${source}`} </Text>;
}

const UtmMedium = () => {
    const medium = useAtomValue(seoMediumAtom)
    if(!medium?.length) return null
    return <Text size='4'> {`&utm_medium=${medium}`}</Text>
}

const UtmContent = () => {
    const content = useAtomValue(seoContentAtom)
    if(!content?.length) return null
    return <Text size='4'> {`&utm_content=${content}`}</Text>
}

const UtmCampaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    if(!campaign?.length) return null
    return <Text size='4'> {`&utm_campaign=${campaign}`}</Text>
}

const UtmTerm = () => {
    const term = useAtomValue(seoTermAtom)
    if(!term?.length) return null
    return <Text size='4'> {`&utm_term=${term}`}</Text>
}

const Destination = () => {
    const destination = useAtomValue(destinationInputAtom)
    return <Text size='3'> {destination} </Text>
}

export const SeoParamsOutput = () => { 

    return (
        <Flex css={{ margin: '$3', padding: '$2', fd: 'row', jc: 'flex-start', ai: 'flex-start', flexWrap: 'wrap', gap: 0}}> 
            <Destination /> 
            <UtmSource /> 
            <UtmMedium />
            <UtmContent />
            <UtmCampaign />
            <UtmTerm /> 
        </Flex>
    )
}
