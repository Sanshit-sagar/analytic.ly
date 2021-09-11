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
import { 
    focussedParamAtom, 
} from '../SeoTab' 

import { useUserUrchins } from '../../../hooks/useUserCollections'
import { ScrollArea } from '../../../primitives/ScrollArea'

interface UserUtmDatum {
    utm: 'campaign' | 'term' | 'medium' | 'content' | 'source';  
    tags: ITag[]; 
}
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

interface IExpandableUtmParametersProps {
    userUtmData: UserUtmDatum[]; 
}

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
    // const focussedInput = useAtomValue(focussedParamInputAtom) || ''
    {/* {tags?.filter((unfilteredTag: ITag) => unfilteredTag.name.startsWith(focussedInput)) */}

    return (
        <Flex css={{ border: detailsBorder, fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
            {tags.map((tag: ITag, i: number) => {
                const tagKey = `utm-${name}-tag_number-${i}-named-${tag.name}`

                // TODO: tag.associations add here!!
                return (
                    <Text key={tagKey} css={{ color: '$text' }}>
                        {tag.name}
                    </Text>
                );
            })}
        </Flex>
    )
}

const ExpandableUtmParameters  = ({ userUtmData }: IExpandableUtmParametersProps) => {
    const focussed = useAtomValue(focussedParamAtom) 

    if(!userUtmData || !userUtmData?.length) return <Text> No Data </Text>
   
    return (
        <Accordion 
            defaultValue={focussed} 
            type="single"
        >
            {userUtmData.map((userUtm: UserUtmDatum, index: number) => {
                const isFocussed = focussed===userUtm.utm
                const isOpen = false // TODO

                const category = userUtm?.utm || ''
                const tags = category ? userUtm?.tags : []
                const tagCount = tags ? tags.length : 0

                if(!category || !category?.length) return null; 

                return (
                    <AccordionItem 
                        key={index} 
                        value={category}
                    >
                        <AccordionTrigger> 
                            <Summary 
                                name={category} 
                                numTags={tagCount} 
                                isFocussed={isFocussed}
                            />
                        </AccordionTrigger>

                        <AccordionContent>
                            <Details
                                name={category}
                                tags={tags}
                                isFocussed={isFocussed} 
                                isOpen={isOpen}
                            />
                        </AccordionContent> 
                    </AccordionItem>
                );
            })}   
        </Accordion>
    )
}

export const UtmParameters = () => {
    const email = 'sanshit.sagar@gmail.com'
    const { userUtms, loading, error } = useUserUrchins(email)

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error </Text>  

    return (
        <ScrollArea>
            <ExpandableUtmParameters 
                userUtmData={userUtms} 
            />
        </ScrollArea>
    );
}

