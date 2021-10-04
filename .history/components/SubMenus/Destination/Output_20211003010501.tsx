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
    mt: '$2',
    mr: '$1',
    ml: '$1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontSize: '$2',
    color: '$funkyText'
})

export const FilteredDestinationUrls = () => {
    let { startsWith } = useFilter({ sensitivity: 'base' })
    const destinationInput = useAtomValue(destinationInputAtom)
    const { data, loading, error } = useSavedDestinations('concise')

    let matchedDestinations: string[] = []
    let allDestinations: string[] = []

    if(!loading && !error && data) {
        matchedDestinations = data.filter((datum) => {
            let urlObject = new URL(datum) 
            allDestinations.push(urlObject.hostname)
            startsWith(urlObject.hostname, destinationInput)
        });
    }

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>
  
    return (
        <ScrollArea>
            <Text> {JSON.stringify(allDestinations)} </Text>
            <MatchedDestinations>
                {matchedDestinations?.map((match, i) => (
                    <DestinationText key={i}> 
                        {match} 
                    </DestinationText>
                ))}
            </MatchedDestinations>

            <MatchedResultsCount>
                {matchedDestinations?.length} matching destinations
            </MatchedResultsCount>
        </ScrollArea>
    );
}