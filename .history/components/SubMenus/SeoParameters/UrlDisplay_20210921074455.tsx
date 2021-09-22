import React from 'react'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

const UtmSource = () => {
    const source = useAtomValue(seoSourceAtom)

    return <Text size='4'> ?utm_source={source} </Text>;
}

const Destination = () => {
    const destination = useAtomValue(seoDestinationAtom)
    return <Text size='3'> </Text>
}

export const FullUrlWithParams = () => { 

    return (
        <Flex css={{ margin: '$3', padding: '$2', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: 0}}> 
            <UtmSource /> 
        </Flex>
    )
}
