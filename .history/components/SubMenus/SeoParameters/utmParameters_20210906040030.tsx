import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'
import { Text } from '../../../primitives/Text'

interface UserUtmTag {
    name: string;
}

export const UtmParameters  = () => {
    const userUtms: { string:  } = {

        campaign: [ { name: 'word1' }, { name: 'word2' } ],
        term: [ { name: 'word3' }, { name: 'word4' } ],
        medium:[ { name: 'word5' }, { name: 'word7' }, { name: 'word6'} ],
        source:[ { name: 'word8' }, { name: 'word9' } ],
        content:[ { name: 'word10' }, { name: 'word1' } ]
    };

    const utmTags: string[] = ['campaign', 'term', 'medium', 'source', 'content']

    return (
        <Accordion 
            type="single" 
            collapsible
        >
            {utmTags.map((utmTag: string, index: number) => {
                 const userUtmsForTag: { name: string }[] = userUtms[utmTag]

                 return (
                    <AccordionItem 
                        key={index} 
                        value={`${index}`}
                    >

                        <AccordionTrigger as='div'> 
                            <Text size='1' css={{ color: '$text' }}> 
                                {utmTag} 
                            </Text>
                        </AccordionTrigger>

                        <AccordionContent as='div'>
                            {userUtmsForTag.map((utmEntry: { name: string }, entryIndex: number) => {
                                return (
                                    <Text 
                                        key={entryIndex} 
                                        size='1' 
                                        css={{ color: '$text' }}
                                    >
                                        {utmEntry.name}
                                    </Text>
                                );
                            })}
                        </AccordionContent> 

                    </AccordionItem>
                );
            })}   
        </Accordion>
    )
}


