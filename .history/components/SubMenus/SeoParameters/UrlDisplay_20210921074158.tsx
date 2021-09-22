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

const UtmSourceParam = () => {
    const source = useAtomValue(seoSourceAtom)

    return <Text> ?utm_source= </Text>
}

const FullUrlWithParams = () => { 

    return (
        <Flex css={{ margin: '$3', padding: '$2', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: 0}}> 
            <Text size='$4'> yoyoyo </Text>
        </Flex>
    )
}