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
    LetterCaseCapitalizeIcon
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
    symbol: string;
    value: string;
    alt?: string | undefined; 
}

interface ISuggestedSlugsProps {
    saltLength: number; 
    numStrings: number; 
    saltTypeIndex:number; 
    separator: string; 
    isManly?: boolean 
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

const saltTypes: ISaltType[] = [
    { id: 'number', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'string', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'mixed', icon: <MixIcon /> },
];

const separators: ISeparator[] = [
    { symbol: '-', value: 'hyphen', alt: 'dash' },
    { symbol: '*', value: 'start', alt: 'asterisk'}, 
    { symbol: '_', value: 'underscore', alt: undefined },
    { symbol: '#', value: 'hashtag', alt: 'pound' },
];

export const numStringsAtom = atom(2)
export const saltLengthAtom = atom(3)
export const saltTypeIndexAtom = atom(0)
export const separatorIndexAtom = atom(0)

export const separatorAtom = atom((get) => separators[get(separatorIndexAtom)])
export const saltTypeAtom = atom((get) => saltTypes[get(saltTypeIndexAtom)])

export const NUM_STRINGS_LABEL = 'Number of Strings'
export const SALT_LENGTH_LABEL = 'Length of Salt'


const SuggestedSlug  = () => {
    const numStrings = useAtomValue(numStringsAtom)
    const saltLength = useAtomValue(saltLengthAtom)
    const separatorIndex = useAtomValue(separatorAtom)
    const saltTypeIndex = useAtomValue(saltTypeAtom)

    let isManly = false; 
    let saltType = saltTypes[saltTypeIndex].id;
    let separator = 
    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Text size='1' css={{ width: 'flex', display: 'inline-flex', flexWrap: 'nowrap', color: '$text'}}>
            {suggestion}
        </Text>
    )
}

const CustomLabel = ({ value }: { value: string }) => (
    <Label>
        <Text size='1' css={{ color: '$text' }}> 
            {value}
         </Text>
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

const isValidIndex = (i: number, arr: any[] | undefined) => {
    return arr && !arr?.length && i < arr.length && arr[i]
} 

const SeperatorSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)

    const SelectionIndicator = ({ index }: { index: number }) => {
        if(index!==separatorIndex) return null;
        return <SelectItemIndicator> <DotFilledIcon /> </SelectItemIndicator>;
    }
    
    const SelectableText = ({ text }: { text: string }) => {
        return <Text css={{ color: '$text'}}> {text} </Text>;
    }

    const SelectTriggerWithIcon = ({ index }: { index: number }) => {
        const selectableText = isValidIndex(index, separators) ? separators[index]?.symbol : ''
        return <Text> {selectableText} <ChevronDownIcon /> </Text>;
    }
        
    return (
        <SelectRoot
            open={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <SelectTriggerWithIcon index={separatorIndex} />
            <SelectContent>
                <SelectRadioGroup>
                    {separators.map((separator: ISeparator, index: number) => {
                        const { symbol, value, alt } = separator

                        return (
                            <SelectRadioItem
                                key={`Separator-${value}-or-${alt}`}
                                onSelect={() => setSeparatorIndex(index)}
                            >
                                <SelectionIndicator index={index} />
                                <SelectableText text={symbol} /> 
                            </SelectRadioItem>
                        )
                    })}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
    )
}

const SaltTypeSelector = () => {
    const [saltTypeIndex, setSaltTypeIndex] = useAtom(saltTypeIndexAtom)


    const updateSaltType = (index: number) => {
        setSaltTypeIndex(index);
    }

    return (
        <ControlGroup>
            <Label>
                <Text size='1' css={{ color: '$text' }}> 
                    Salt Type {saltTypes[saltTypeIndex].id}
                 </Text>
            </Label>

            <ToolbarToggleGroup 
                type='single' 
                value={saltTypes[saltTypeIndex].id} 
                onValueChange={(value: number) => updateSaltType(value)}
            > 
                {saltTypes.map((value: { id: string; icon: any; }, i: number) => {
                    return (
                        <ToolbarToggleItem 
                            key={`Salt-type-${i}`} 
                            value={i}
                        > 
                            <Tooltip content={`Salt: ${value.id}`}>
                                <Icon label={`salt-type-${value.id}`}>
                                    <Text css={{ color: '$text' }}>
                                        {value.icon}
                                    </Text>
                                </Icon>
                            </Tooltip>
                         </ToolbarToggleItem>
                    );
                })}
            </ToolbarToggleGroup>
        </ControlGroup> 
    )
}

const SlugTabContent = () => {


    return (
        <Flex css={{ width: '700px', margin: 'auto', fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            <SlugCategorySelector />
            <Toolbar> 
                <NumStringsFieldSet />
                <SaltLengthFieldSet />
                <SeparatorSelector />
                <SaltTypeSelector /> 
             </Toolbar>   
            <SuggestedSlug />
        </Flex>
    );
}

export default SlugTabContent