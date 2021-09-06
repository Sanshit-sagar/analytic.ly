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

    return (
        <Accordion 
            type="single" 
            defaultValue='campaign'
            collapsible
        >
         {Object.entries(userUtms).map((userUtm: IUtmField, index: number) => {
            <AccordionItem value={param.name}> 
                <AccordionTrigger> {param.name} </AccordionTrigger>
                <AccordionContent>
                    {utmParams[]}
                </AccordionContent> 
            </AccordionItem>
         })}   
        </Accordion>
    )
}


