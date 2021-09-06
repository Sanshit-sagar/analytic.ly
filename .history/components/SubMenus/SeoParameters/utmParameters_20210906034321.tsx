import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'
import { Text } from '../../../primitives/Text'

type UtmTagType = 'content' | 'campaign' | 'medium' | 'term' | 'source'
 
// interface IUtmSet {
    // campaign: { name: string }[];
    // term: { name: string }[];
    // medium: { name: string }[];
    // source: { name: string }[];
    // content: { name: string }[];
// }

export const UtmParameters  = () => {
    const userUtms: { UtmTagType: { name: string; }[] } = {
        campaign': [ 
            { name: 'word1' }, 
            { name: 'word2' }
        ],
        'term': [ 
            { name: 'word3' }, 
            { name: 'word4' }
        ],
        'medium':[ 
            { name: 'word5' }, 
            { name: 'word7' }, 
            { name: 'word6'}
        ],
        'source':[ 
            { name: 'word8' }, 
            { name: 'word9' }
        ],
        'content':[ 
            { name: 'word10' }, 
            { name: 'word1' }
        ]
    };

    const utmTags: UtmTagType[] = ['campaign', 'term', 'medium', 'source', 'content']

    return (
        <Accordion 
            type="single" 
            defaultValue='campaign'
        >
            {utmTags.map((utmTag: UtmTagType, index: number) => {
                 const userUtmsForTag: { name: string }[] = userUtms[utmTag]

                 return (
                    <AccordionItem key={index} value={utmTag}>

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


