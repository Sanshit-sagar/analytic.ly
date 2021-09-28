import React from 'react'
import { styled } from '../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../atoms/urchins'
import {
    destinationInputAtom
} from '../../atoms/destination'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { 
    focussedParamAtom, 
    clickedParamAtom, 
    hoveredParamAtom 
} from '../../atoms/urchins'

import { ScrollArea } from '../../primitives/ScrollArea'

const OutputContainer = styled(Flex, {
    margin: '$3', 
    padding: '$2', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    flexWrap: 'wrap', 
    gap: 0,
    border: '2px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
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
    return <Text size='3'> {!destination?.length ? 'https://www.____' : destination} </Text>
}


const Hovered = () => {
    const hovered = useAtomValue(hoveredParamAtom)
    return <Text size='4'> HOVER: {hovered} </Text>
}

export const  = () => (
    <ScrollArea>
        <OutputContainer> 
            <Destination /> 
            <UtmSource /> 
            <UtmMedium />
            <UtmContent />
            <UtmCampaign />
            <UtmTerm /> 
            <Hovered /> 
        </OutputContainer>
    </ScrollArea>
);
