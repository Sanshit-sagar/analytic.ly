import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'

import { IParamsAccordion } from '../interfaces'

type UtmFieldType = 'content' | 'campaign' | 'medium' | 'term' | 'source'

interface IUtmField {
    name: string;
}

interface IUtmSet {
    campaign: IUtmField[];
    term: IUtmField[];
    medium: IUtmField[];
    source: IUtmField[];
    content: IUtmField[];
}

export const UtmParameters  = () => {
    const userUtms: IUtmSet = {
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

    const utmTags = ['campaign', 'term', 'medium', 'source', 'content']

    return (
        <Accordion 
            type="single" 
            defaultValue='campaign'
            collapsible
        >
         {utmTags.map((utmTag: string, index: number) => {
             const userUtmsForTag = userUtms[utmTag]

             return (
                <AccordionItem value={utmTag}> 
                    <AccordionTrigger> {utmTag} </AccordionTrigger>
                    <AccordionContent>
                        {userUtmsForTag.map((uft, i) => {
                            return (
                                <Text size='1' css={{ color: '$text' }}>
                                    
                                </Text>
                            );
                        })}
                    </AccordionContent> 
                </AccordionItem>
         })}   
        </Accordion>
    )
}


