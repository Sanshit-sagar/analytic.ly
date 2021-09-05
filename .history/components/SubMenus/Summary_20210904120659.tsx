import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { 
    destinationInputAtom 
} from './DestinationTab'

import {
    seoSourceAtom,
    seoMediumAtom, 
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom,
    utmStrAtom,
    focussedParamAtom
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
             css={{ color: '$text' }}
        >
            {datum.name}: {datum.value}
        </Text>
    )
}


export const InputUrlWithInputUtmTags:React.FC = () => {
    const utmUrl = useAtomValue<string>(utmStrAtom)
    const destinationUrl = useAtomValue<string>(destinationInputAtom)
    const focussed = useAtomValue<string>(focussedParamAtom)

    return (
        <Box 
            css={{ 
                width: '100%', border: '2px solid', padding: '$1', br: '$2',
                fd: 'column',jc: 'flex-start', ai: 'stretch', gap: '1' 
            }}
        >
            <Text css={{ color: '$accent', textDecoration: 'underline' }}> 
                {focussed} 
            </Text>
            <Text css={{ color: '$text' }}>
               Result:{destinationUrl}&{utmUrl}
            </Text>
        </Box>
    )
}


const NewSlugDetails = () => {
    const source = useAtomValue(seoSourceAtom)
    const medium = useAtomValue(seoMediumAtom)
    const term = useAtomValue(seoTermAtom)
    const content = useAtomValue(seoContentAtom)
    const campaign = useAtomValue(seoCampaignAtom)
    const destination = useAtomValue(destinationInputAtom)
    const utmStr = useAtomValue(utmStrAtom)

    const data: Datum[] = [
        { name: 'source', value: source, },
        { name: 'medium', value: medium, },
        { name: 'destination', value: destination, },
        { name: 'term', value: term}, 
        { name: 'content', value: content }, 
        { name: 'campaign', content: campaign }
        { name: 'utmStr', value: utmStr, },
    ];

    return (
        <Box css={{ height: '150px', overflowY: 'scroll', bc: 'white' }}>
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

export default NewSlugDetails
