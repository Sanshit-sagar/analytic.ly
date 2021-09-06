import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'

import { IParamsAccordion } from '../interfaces'

type UtmFieldType = 'content' | 'campaign' | 'medium' | 'term' | 'source'

interface IUtm {
    name: string;
}

interface IUtmCategory {
    campaign: IUtm[];
    term: IUtm[];
    medium: IUtm[];
    source: IUtm[];
    content: IUtm[];
}

export const UtmParameters  = ({ params, name, index}: IParamsAccordion) => {
    const utmParams: IUtmCategory = {
        campaign: [ { name: 'word1' }, { name: 'word2' }],
        term: [ { name: 'word3' }, { name: 'word4' }],
        medium:[ { name: 'word5' }, { name: 'word7' }, { name: 'word6'}],
        source:[ { name: 'word8' }, { name: 'word9' }],
        content:[ { name: 'word10' }, { name: 'word1' }],
    };

    return (
        <Accordion 
            type="single" 
            defaultValue="item-1" 
            collapsible
        >
         {utmParams.map((param: ))}   
            <AccordionItem value=
            

        </Accordion>
    )
}


