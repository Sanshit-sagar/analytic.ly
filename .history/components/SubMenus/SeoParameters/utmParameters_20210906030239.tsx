import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'

import { IParamsAccordion, IUtmParameters } from '../interfaces'

interface IUtm {
    name: string;
    slugUsage: number;
    templateUsage: number;
    associatedSlugs: string[];
    associatedTemplateIds: string[]; 
}

interface IUtmCategory {
    [key: string]: IUtm[]
}

export const UtmParameters  = ({ params, name, index}: IParamsAccordion) => {
    const utmParams: IUtmCategory = {
        campaign': ['word1', 'word2'],
        term': ['word3', 'word4'],
        medium': ['word5', 'word6', 'word7'],
        source': ['word8', 'word9'],
        content': ['word10', 'word11'],
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


