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

const userUtms = [
    { utm: 'campaign', tags: [{ name: 'word1' }, { name: 'word2' }] },
    { utm: 'term', tags:[{ name: 'word3' }, { name: 'word4' }] },
    { utm: 'medium', tags: [ { name: 'word5' }, { name: 'word7' }, { name: 'word6'}] },
    { utm: 'content', tags: [{ name: 'word8' }, { name: 'word9' }] },
    { utm: 'source', tags: [{ name: 'word10' }, { name: 'word1' }] }
];

export const UtmParameters  = () => {

    return (
        <Accordion 
            type="single" 
            collapsible
        >
            {userUtms.map((userUtm: { utm: string; tags: { name: string }[] }, index: number) => {
                 const userUtmsForTag: { name: string }[] = userUtm.tags;

                 return (
                    <AccordionItem 
                        key={index} 
                        value={userUtm.utm}
                    >
                        <AccordionTrigger> 
                            <Text size='1' css={{ color: '$text' }}> 
                                {userUtm.utm} 
                            </Text>
                        </AccordionTrigger>

                        <AccordionContent>
                            <Box css={{ }}
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

