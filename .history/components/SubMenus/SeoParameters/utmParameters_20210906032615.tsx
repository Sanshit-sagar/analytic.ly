import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'

import { IParamsAccordion } from '../interfaces'

type UtmTagType = 'content' | 'campaign' | 'medium' | 'term' | 'source'

interface IUtmSet {
    campaign: IUtmField[];
    term: IUtmField[];
    medium: IUtmField[];
    source: IUtmField[];
    content: IUtmField[];
}

export const UtmParameters  = () => {
    const userUtms: { } = {
        campaign: [ 
            { name: 'word1' }, 
            { name: 'word2' }
        ],
        term: [ 
            { name: 'word3' }, 
            { name: 'word4' }
        ],
        medium:[ 
            { name: 'word5' }, 
            { name: 'word7' }, 
            { name: 'word6'}
        ],
        source:[ 
            { name: 'word8' }, 
            { name: 'word9' }
        ],
        content:[ 
            { name: 'word10' }, 
            { name: 'word1' }
        ]
    };

    const utmTags: string[] = ['campaign', 'term', 'medium', 'source', 'content']

    return (
        <Accordion 
            type="single" 
            defaultValue='campaign'
        >
            {utmTags.map((utmTag: string, index: number) => {
                 const userUtmsForTag = userUtms[utmTag]

                 return (
                    <AccordionItem key={index} value={utmTag}> 
                        <AccordionTrigger> {utmTag} </AccordionTrigger>
                        <AccordionContent>
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


