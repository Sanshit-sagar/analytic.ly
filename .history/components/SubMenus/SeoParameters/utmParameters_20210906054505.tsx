import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../../../primitives/Accordion'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { useAtomValue } from 'jotai/utils'
import { focussedParamAtom } from '../SeoTab' 

interface ITag {
    name: string;
    associatedSlugs?: string[];
    associatedTemplateIds?: string[];
    clicks?: number;
}

interface IUtmTagSummaryProps {
    name: string; 
    numTags: number; 
    isFocussed: boolean;
}

interface IUtmTagDetailsProps {
    name: string;
    tags: ITag[]; 
    isFocussed: boolean;
    isOpen: boolean;
}

const userUtms = [
    { utm: 'campaign', tags: [{ name: 'word1' }, { name: 'word2' }] },
    { utm: 'term', tags:[{ name: 'word3' }, { name: 'word4' }] },
    { utm: 'medium', tags: [ { name: 'word5' }, { name: 'word7' }, { name: 'word6'}] },
    { utm: 'content', tags: [{ name: 'word8' }, { name: 'word9' }] },
    { utm: 'source', tags: [{ name: 'word10' }, { name: 'word1' }] }
];

const Summary = ({ name, numTags, isFocussed }: IUtmTagSummaryProps) => {
    const title = `${name} [${numTags}]`
    const titleColor =  isFocussed ? '$funky' : '$text'

    return (
        <Text css={{ color: titleColor }}>
            {title} 
        </Text>
    )
}

//isFocussed = user typing here
//isOpen = opened at some point, not closed since
const Details = ({ name, tags, isFocussed, isOpen }: IUtmTagDetailsProps) => {
    const detailsBorder = isFocussed ? 'thin solid red' : isOpen ? 'thin solid pink' : ''

    return (
        <Flex css={{ border: detailsBorder, fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
            {tags.map((tag: ITag, i: number) => {
                const tagKey = `utm-${name}-tag_number-${i}-named-${tag.name}`

                return (
                    <Text key={tagKey}  css={{ color: '$text' }}>
                        {tag.name}
                    </Text>
                );
            })}
        </Flex>
    )
}

export const UtmParameters  = () => {
    const focussed = useAtomValue(focussedParamAtom) 

    return (
        <Accordion type="multiple">
            {userUtms.map((userUtm: , index: number) => {
                const isFocussed = focussed===userUtm.utm

                return (
                    <AccordionItem 
                        key={index} 
                        value={userUtm.utm}
                    >
                        <AccordionTrigger> 
                            <Summary 
                                name={userUtm.utm} 
                                numTags={userUtm.tags.length} 
                                isFocussed={isFocussed}
                            />
                        </AccordionTrigger>

                        <AccordionContent>
                            <Details
                                name={userUtm.utm} 
                                tags={userUtm.tags} 
                                isFocussed={isFocussed} 
                                isOpen={false}
                            />
                        </AccordionContent> 
                    </AccordionItem>
                );
            })}   
        </Accordion>
    )
}


