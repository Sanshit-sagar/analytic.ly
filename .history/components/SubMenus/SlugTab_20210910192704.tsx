import React, { useState } from 'react'

import { NumberField } from '../../compositions/NumberField'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent,
    SelectableText,
    SelectIndicator
} from '../../primitives/Select'

import { 
    ChevronDownIcon, 
    MixIcon,
    LetterCaseCapitalizeIcon,
    DotIcon, 
    DashIcon, 
    StarIcon
} from '@radix-ui/react-icons'

import SelectMenu from '../../compositions/SelectMenu'

type SaltTypeType = 'string' | 'number' | 'mixed';

interface ISaltType {
    id: SaltTypeType; 
    icon: JSX.Element; 
}

interface ISelectMenuProps {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
    description?: string | undefined; 
}

const slugCategoryOptions: ISelectMenuProps[] = [
    { textValue: 'Random', value: 'random', icon: <MixIcon />, description: '', alt: '', groupName: 'category' },
    { textValue: 'Custom', value: 'custom', icon: <StarIcon />, description: '', alt: '', groupName: 'category' },
];

const separators: ISelectMenuProps[] = [
    { textValue: '-', value: 'hyphen', alt: 'dash', icon: <DashIcon />, description: '', groupName: 'category' },
    { textValue: '_', value: 'underscore', alt: undefined, icon: undefined, description: '', groupName: 'slug' },
    { textValue: '*', value: 'star', alt: 'asterisk', icon: <StarIcon />, description: '', groupName: 'slug' }, 
    { textValue: '.', value: 'dot', alt: 'period', icon: <DotIcon />, description: '', groupName: 'slug' }
];

const saltTypes: ISaltType[] = [
    { id: 'number', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'string', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'mixed', icon: <MixIcon /> },
];

export const numStringsAtom = atom(2)
export const saltLengthAtom = atom(3)
export const saltTypeIndexAtom = atom(0)
export const separatorIndexAtom = atom(0)

export const separatorAtom = atom((get) => separators[get(separatorIndexAtom)].textValue)
export const separatorTextAtom = atom((get) => separators[get(separatorIndexAtom)].value)
export const saltTypeAtom = atom((get) => saltTypes[get(saltTypeIndexAtom)].id)

export const NUM_STRINGS_LABEL = 'Number of Strings'
export const SALT_LENGTH_LABEL = 'Salt Length'
export const SEPARATOR_LABEL = 'Separator'

export const SEPARATOR_NAME = 'STRING SEPARATOR'
export const SALT_LENGTH_NAME = 'SALT LENGTH'

const SuggestedSlug  = () => {
    const numStrings = useAtomValue(numStringsAtom)
    const saltLength = useAtomValue(saltLengthAtom)
    const separator = useAtomValue(separatorAtom)
    const saltType = useAtomValue(saltTypeAtom)
    let isManly = false; 

    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Text size='3' css={{ color: '$text'}}>
            {suggestion}
        </Text>
    )
}

const slugCategoryIndexAtom = atom(0)
const slugCategory = atom(slugCategoryOptions[0].)

const SlugCategorySelector = () => {
    const [slugCateogoryIndex, setSlugCategoryIndex] = useAtom(slugCategoryIndexAtom)
    const slugCategory = useAtomValue(slugCategoryAtom) 

    const SelectionIndicator = ({ index }: { index: number }) => {
        if(index!==selectedIndex) return null;
        return <SelectIndicator />;
    }

    const SelectText = ({ text }: { text: string }) => {
        return <SelectableText> {text} </SelectableText>;
    }
            
    return (
        <SelectRoot
            open={isOpen || false}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <SelectTrigger>
                <Text> 
                    {slugCategoryOptions[selectedIndex]?.category} 
                    <ChevronDownIcon />
                </Text>
            </SelectTrigger>
            <SelectContent>
                <SelectRadioGroup>
                    {slugCategoryOptions.map((option: ISlugCateogry, index: number) => {
                        return (
                            <SelectRadioItem
                                key={index}
                                onSelect={() => setSelectedIndex(index)}
                            > 
                                <SelectionIndicator index={index} />
                                <SelectText text={option.category} />
                            </SelectRadioItem>
                        );
                    })}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
    );
}

const NumStringsFieldSet = () => {
    const [numStrings, setNumStrings] = useAtom(numStringsAtom)

    return (
        <NumberField
            label={NUM_STRINGS_LABEL}
            value={numStrings} 
            onChange={(value: number) => setNumStrings(value)}
        />
    );
}

const SaltLengthFieldSet = () => {
    const [saltLength, setSaltLength] = useAtom(saltLengthAtom)

    return (
        <NumberField
            label={SALT_LENGTH_LABEL}
            value={saltLength} 
            onChange={(value: number) => setSaltLength(value)}
        />
    )
}

const SeperatorSelector = () => {
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)

    return (
        <SelectMenu 
            selectOnly={false}
            items={separators}
            selectedIndex={separatorIndex}
            setSelectedIndex={setSeparatorIndex}
            selectedValue={separator}
            selectedTextValue={separatorText}
            group={SEPARATOR_LABEL}
        />
    )
}

const SlugTabContent = () => {


    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            <SlugCategorySelector />
   
            <Flex css={{ fd: 'row', jc: 'center', ai: 'flex-start', gap: '$1' }}>
                <NumStringsFieldSet />
                <SaltLengthFieldSet />
                <SeperatorSelector />
            </Flex>

            <SuggestedSlug />
        </Flex>
    );
}

export default SlugTabContent