import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'

import { IParamsList } from '../interfaces'

export const UtmParameters  = ({ params, name, index}: IParamsList) => {
    const savedParams = {
        'campaign': ['word1', 'word2'],
        'term': ['word3', 'word4'],
        'medium': ['word5', 'word6', 'word7'],
        'source': ['word8', 'word9'],
        'content': ['word10', 'word11'],
    };
    
    return (
        <Accordion 
            type="single" 
            defaultValue="item-1" 
            collapsible
        >
            
            <AccordionItem value=
            

        </Accordion>
    )
}


