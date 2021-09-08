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

interface ISlugCateogry {
    id: number; 
    category: string; 
    description: string; 
}

interface ISuggestedSlugsProps {
    saltLength: number; 
    numStrings: number; 
    saltTypeIndex:number; 
    separator: string; 
    isManly?: boolean 
}

const slugCategoryOptions: ISlugCateogry[] = [
    { id: 0, category: 'Random', description: '' },
    { id: 1, category: 'Custom', description: ''  },
];

interface ISeparator {
    symbol: string;
    value: string;
    alt?: string | undefined; 
}



export const numStringsAtom = atom(2)
export const saltLengthAtom = atom(3)
export const saltTypeIndexAtom = atom(0)
export const separatorAtom = atom('-')

export const NUM_STRINGS_LABEL = 'Number of Strings'

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
            
    return (
        <Flex css={{ width: '200px', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Text size='1'> 
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
                                    css={{ textTransform: 'uppercase' }}
                                >
                                     <Flex css={{ display: 'flex', fd: 'row', jc: 'flex-start', ai: 'center', gap: 0 }}>   
                                        {index===selectedIndex &&
                                            <SelectItemIndicator>
                                                <DotFilledIcon /> 
                                            </SelectItemIndicator>
                                         }
                                        <Text size='1' css={{ color: '$text'}}> 
                                            {option.category} 
                                        </Text>
                                    </Flex>
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    );
}

const saltTypes = [
    { id: 'number', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'string', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'mixed', icon: <MixIcon /> },
];

const SuggestedSlug  = ({ saltLength, numStrings, separator, saltTypeIndex }: ISuggestedSlugsProps) => {
    let isManly = false; 
    let saltType = saltTypes[saltTypeIndex].id;
    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Text size='1' css={{ width: 'flex', display: 'inline-flex', flexWrap: 'nowrap', color: '$text'}}>
            {suggestion}
        </Text>
    )
}

const NumericalFieldSet = ({ label, value, handleUpdate }: INumberFieldProps) => {

    return (
        <ControlGroup> 
            <CustomLabel value={label} />

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
            label={`NumStrings`}
            value={numStrings} 
            handleUpdate={(value: number) => setNumStrings(value)}
        />
    );
}

const SaltLengthFieldSet = () => {
    const [saltLength, setSaltLength] = useAtom(saltLengthAtom)

    return (
        <NumericalFieldSet 
            label={`SaltLen`}
            value={saltLength} 
            handleUpdate={(value: number) => setSaltLength(value)}
        />
    )
}

const SeparatorSelector = () => {
    const [separator, setSeparator] = useAtom(separatorAtom)

    const separators: ISeparator[] = [
        { symbol: '-', value: 'hyphen', alt: 'dash' },
        { symbol: '*', value: 'start', alt: 'asterisk'}, 
        { symbol: '_', value: 'underscore', alt: undefined },
        { symbol: '#', value: 'hashtag', alt: 'pound' },
    ];

    const handleSeparatorChange = (value: string) => setSeparator(value)

    return (
        <ControlGroup> 
            <CustomLabel value='Separator' /> 

            <ToolbarToggleGroup 
                type='single' 
                aria-label='slug-word-separator'
                value={separator}
                onValueChange={handleSeparatorChange}
            >
                {separators.map((separator: ISeparator, index: number) => {
                    return (
                        <ToolbarToggleItem 
                            key={`Separator-id-${index}`}
                            value={separator.value}
                            aria-label={`Separator-with-symbol-for-${separator.value}`}
                        >
                           <Text size='1' css={{ color: '$text' }}>
                               {separator.symbol}
                            </Text>
                        </ToolbarToggleItem>
                    );
                })}
            </ToolbarToggleGroup>

        </ControlGroup>
    )
}

const SaltTypePicker = () => {
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
                {saltTypes.map((value: { id: string; icon: React.ReactNode | JSX.Element | Element; }, i: number) => {
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

const SuggestedSlug = () => {

    
}
                
const SlugTabContent = () => {
    const numStrings = useAtomValue(numStringsAtom)
    const saltLength = useAtomValue(saltLengthAtom)
    const saltTypeIndex = useAtomValue(saltTypeIndexAtom)
    const separator = useAtomValue(separatorAtom)

    return (
        <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            <SlugCategorySelector />

            <Toolbar> 
                <NumStringsFieldSet />
                <SaltLengthFieldSet />
                <SeparatorSelector />
                <SaltTypePicker /> 
             </Toolbar>   

            <SuggestedSlug 
                saltLength={saltLength} 
                numStrings={numStrings} 
                separator={separator} 
                saltTypeIndex={saltTypeIndex} 
            />
        </Flex>
    );
}

export default SlugTabContent