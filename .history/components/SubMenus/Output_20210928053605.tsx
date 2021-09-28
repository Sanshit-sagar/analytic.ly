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

const OutputContainer = styled('div', {
    height: '4em',
    lineHeight: '1em',
    overflowX: 'scroll',
    overflowY: 'hidden',
    margin: '$3', 
    padding: '$2', 
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
    return !medium?.length ? null : <Text size='4'> {`&utm_medium=${medium}`
}

const UtmContent = () => {
    const content = useAtomValue(seoContentAtom)
    return !content?.length ? null : `&utm_content=${content}`
}

const UtmCampaign = () => {
    const campaign = useAtomValue(seoCampaignAtom)
    return !campaign?.length ? null : `&utm_campaign=${campaign}`
}

const UtmTerm = () => {
    const term = useAtomValue(seoTermAtom)
    return !term?.length ? null : `&utm_term=${term}`
}

const Destination = () => {
    const destination = useAtomValue(destinationInputAtom)
    return !destination?.length ? '' : destination
}


// const Hovered = () => {
//     const hovered = useAtomValue(hoveredParamAtom)
//     return <Text size='4'> HOVER: {hovered} </Text>
// }

export const SubmissionUrl = () => (
    
        // <OutputContainer> 
            <ScrollArea>
                <Destination /> 
                <UtmSource /> 
                <UtmMedium />
                <UtmContent />
                <UtmCampaign />
                <UtmTerm /> 
            </ScrollArea>
        // </OutputContainer>
);
