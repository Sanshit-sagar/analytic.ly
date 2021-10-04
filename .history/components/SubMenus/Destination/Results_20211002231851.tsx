import React from 'react'
import { styled } from '../../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useFilter } from '@react-aria/i18n'
import { useSavedDestinations } from '../../../hooks/useSavedCollections'

import { Text } from '../../../primitives/Text'
import { ScrollArea } from '../../../primitives/ScrollArea'

const MatchedDestinations = styled('ul', {
    width: '250px',
    height: '250px',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    gap: '$2'
})

const DestinationText = styled(Text, {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    fontSize: '$2',
    color: '$text'
}); 

const MatchedResultsCount = styled(Text, {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontSize: '$2',
    color: '$funkyText'
})

export const Results = () => {
    let { contains } = useFilter({ sensitivity: 'base' })
    const destinationInput = useAtomValue(destinationInputAtom)
    const { data, loading, error } = useSavedDestinations('concise')

    let matchedDestinations: string[] = []

    if(!loading && !error && data) {
        matchedDestinations = data.filter((datum) => {
            contains(datum, destinationInput)
        });
    }

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

    return (
        <ScrollArea>
            <MatchedDestinations>
                {matchedDestinations.map((match, i) => (
                    <DestinationText key={i}> 
                        {match} 
                    </DestinationText>
                ))}
            </MatchedDestinations>

            <MatchedResultsCount count: number ={list && list?.items.length}>
                {matchedDestinations.sli1/15 }
            </MatchedResultsCount>
        </ScrollArea>
    );
}