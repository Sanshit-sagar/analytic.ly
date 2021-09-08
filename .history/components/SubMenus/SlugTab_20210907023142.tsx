import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Tooltip } from '../../primitives/Tooltip'
import { Icon } from '../../primitives/Icon'

import { ControlGroup, Label, Input } from '../../primitives/FieldSet' 
import {
    Toolbar,
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../../primitives/Toolbar' 

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent,
    SelectItemIndicator
} from '../../primitives/Select'

import { 
    ChevronDownIcon, 
    DotFilledIcon,
    MixIcon,
    LetterCaseCapitalizeIcon,
    PlusIcon, 
    MinusIcon, 
    DashIcon, 
    StarIcon,
    SlashIcon
} from '@radix-ui/react-icons'

type SaltTypeType = 'string' | 'number' | 'mixed';

interface ISaltType {
    id: SaltTypeType; 
    icon: JSX.Element; 
}

interface ISlugCateogry {
    id: number; 
    category: string; 
    description: string; 
}

interface ISeparator {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
}

interface INumberFieldProps {
    label: string | readonly string[] | undefined; 
    value: string | number | readonly string[] | undefined; 
    handleUpdate: (value: number) => void;
}

const slugCategoryOptions: ISlugCateogry[] = [
    { id: 0, category: 'Random', description: '' },
    { id: 1, category: 'Custom', description: ''  },
];

const separators: ISeparator[] = [
    { textValue: '-', value: 'hyphen', alt: 'dash', icon: <DashIcon /> },
    { textValue: '*', value: 'star', alt: 'asterisk', icon: <StarIcon /> }, 
    { textValue: '_', value: 'underscore', alt: undefined, icon: undefined },
    { textValue: '#', value: 'hashtag', alt: 'pound', icon: undefined  },
    { textValue: ':', value: 'colon', alt: undefined, icon: undefined },
    { textValue: '/', value: 'slash', alt: 'divide', icon: <SlashIcon />  },
    { textValue: '~', value: 'tilde', alt: 'twiddle', icon: undefined },
    { textValue: '+', value: 'plus', alt: 'add', icon: <PlusIcon /> },
    { textValue: '--', value: 'minus', alt: undefined, icon: <MinusIcon /> },
];

const saltTypes: ISaltType[] = [
    { id: 'number', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'string', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'mixed', icon: <MixIcon /> },
];

const isValidIndex = (i: number, arr: any[] | undefined) => {
    return arr && !arr?.length && i < arr.length && arr[i]
} 

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

const CustomLabel = ({ value }: { value: string }) => (
    <Label>
        <Text css={{ color: '$text' }}> {value} </Text>
    </Label>
);

const SlugCategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const SelectionIndicator = ({ index }: { index: number }) => {
        if(index!==selectedIndex) return null;
        return <SelectItemIndicator> <DotFilledIcon /> </SelectItemIndicator>;
    }

    const SelectText = ({ text }: { text: string }) => {
        return <Text size='1' css={{ color: '$text'}}> {text} </Text>;
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

const NumericalFieldSet = ({ label, value, handleUpdate }: INumberFieldProps) => {

    return (
        <ControlGroup> 
            <CustomLabel value={`${label}`} />

            <Input 
                type='number'
                key={`label-${label}`}
                value={value} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleUpdate(parseInt(`${event.currentTarget.value}`))
                }}
                css={{ width: '100px' }}
            />
        </ControlGroup>
    )
}


const NumStringsFieldSet = () => {
    const [numStrings, setNumStrings] = useAtom(numStringsAtom)

    return (
        <NumericalFieldSet
            label={NUM_STRINGS_LABEL}
            value={numStrings} 
            handleUpdate={(value: number) => setNumStrings(value)}
        />
    );
}

const SaltLengthFieldSet = () => {
    const [saltLength, setSaltLength] = useAtom(saltLengthAtom)

    return (
        <NumericalFieldSet 
            label={SALT_LENGTH_LABEL}
            value={saltLength} 
            handleUpdate={(value: number) => setSaltLength(value)}
        />
    )
}


const SeperatorSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)

    const handleSelection = (event: React.ChangeEvent<typeof SelectRadioItem>) => {
        setSeparatorIndex(parseInt(event.currentTarget.value))
    }

    const SelectionIndicator = ({ index }: { index: number }) => {
        return index===separatorIndex 
            ? <SelectItemIndicator> <DotFilledIcon /> </SelectItemIndicator> 
            : null;
    }
    
    const SelectableText = ({ text }: { text: string }) => {
        return <Text css={{ color: '$text'}}> {separator} ({separatorText}) </Text>;
    }

    return (
        <ControlGroup>
            <CustomLabel value={SEPARATOR_LABEL} />
            <SelectRoot
                open={isOpen}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'center' }}>  
                        <> {separator} {separatorText} </>
                        <ChevronDownIcon />  
                    </Text>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {separators.map((separator: ISeparator, index: number) => {
                            const { textValue, value, alt, icon } = separator

                            return (
                                <SelectRadioItem
                                    key={`Separator-${value}-or-${alt}`}
                                    value={`${index}`}
                                    textValue={textValue}
                                    onSelect={handleSelection}
                                >
                                    <SelectionIndicator index={index} />
                                    <SelectableText text={textValue} /> 
                                </SelectRadioItem>
                            )
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </ControlGroup>
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