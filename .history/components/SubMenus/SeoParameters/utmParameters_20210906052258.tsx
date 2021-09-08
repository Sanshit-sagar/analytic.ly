import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'
import { Text } from '../../../primitives/Text'

import { useAtomValue } from 'jotai/utils'
import { focussedParamAtom } from '../SeoTab' 

const userUtms = [
    { utm: 'campaign', tags: [{ name: 'word1' }, { name: 'word2' }] },
    { utm: 'term', tags:[{ name: 'word3' }, { name: 'word4' }] },
    { utm: 'medium', tags: [ { name: 'word5' }, { name: 'word7' }, { name: 'word6'}] },
    { utm: 'content', tags: [{ name: 'word8' }, { name: 'word9' }] },
    { utm: 'source', tags: [{ name: 'word10' }, { name: 'word1' }] }
];

const Summary = ({ name, tags }: { name: string; tags: { name: string }[] }) => {
    const summarized = `${name} [${tags.length}]`

    return (
        <Text size='1' css={{ color: '$text' }}> 
            {summarized} 
        </Text>
    )
}

export const UtmParameters  = () => {
    const focussed = useAtomValue(focussedParamAtom) 

    return (
        <Accordion 
            type="single" 
            collapsible
        >
            {userUtms.map((userUtm: { utm: string; tags: { name: string }[] }, index: number) => {
                const userUtmsForTag: { name: string }[] = userUtm.tags
                const isFocussed = focussed===userUtm.utm


                return (
                    <AccordionItem 
                        key={index} 
                        value={userUtm.utm}
                    >
                        <AccordionTrigger> 
                            <Summary 
                                name={userUtm.utm} 
                                tags={userUtm.tags} 
                                isFocussed
                            />
                        </AccordionTrigger>

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


