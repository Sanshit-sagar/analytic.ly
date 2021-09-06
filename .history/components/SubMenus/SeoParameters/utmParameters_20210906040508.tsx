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
interface UserUtms {
    category: UserUtmTag[];
    content: UserUtmTag[];
    source: UserUtmTag[];
    term: UserUtmTag[];
    medium: UserUtmTag[]; 
}

const userUtms: UserUtms = {
    campaign: [ { name: 'word1' }, { name: 'word2' } ],
    term: [ { name: 'word3' }, { name: 'word4' } ],
    medium:[ { name: 'word5' }, { name: 'word7' }, { name: 'word6'} ],
    source:[ { name: 'word8' }, { name: 'word9' } ],
    content:[ { name: 'word10' }, { name: 'word1' } ]
};

export const UtmParameters  = () => {


    const utmTags: string[] = ['campaign', 'term', 'medium', 'source', 'content']

    return (
        <Accordion 
            type="single" 
            collapsible
        >
            {Object.keys(userUtms).map((key: string, index: number) => {
                 const userUtmsForTag: UserUtmTag[] = userUtms[key]

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


