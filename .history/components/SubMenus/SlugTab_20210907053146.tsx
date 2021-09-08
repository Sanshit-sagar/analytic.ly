import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { ControlGroup, Label, Input } from '../../primitives/FieldSet' 

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent,
    SelectItemIndicator,
    SelectableText,
    SelectIndicator
} from '../../primitives/Select'

import { 
    ChevronDownIcon, 
    DotFilledIcon,
    MixIcon,
    LetterCaseCapitalizeIcon,
    DotIcon, 
    DashIcon, 
    StarIcon
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
    { textValue: '_', value: 'underscore', alt: undefined, icon: undefined },
    { textValue: '*', value: 'star', alt: 'asterisk', icon: <StarIcon /> }, 
    { textValue: '.', value: 'dot', alt: 'period', icon: <DotIcon /> }
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

const hashAb = (a: string, b: string) => `item-${a}-value-${b || ''}`
const hashI = (i: number) => `item-index-${i}`
const generateKeyFromValue = (controlGroupName: string, a: string, b?: string) => `${controlGroupName}-${hashAB(a,b)}`
const generateKeyFromIndex = (controlGroupName: string, i: number) => `${controlGroupName}-${hashI(i)}`

const SeperatorSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)
    
    const controlGroupLabel = SEPARATOR_LABEL
    const controlGroupName = SEPARATOR_NAME
    const evaluate = (value: number): string => `${value}`
    
    
    const hash = (a?: string, b?: string, i?: number): string => {
        a && b ? generateKey(controlGroupName, a, b) : i ? `${controlGroupName}-${hashI(i)}`;
    };

    const isSelected = (i: number): boolean => i===separatorIndex
    const handleSelection = (selectedIndex: number): void => setSeparatorIndex(selectedIndex)
    const SelectionIndicator = ({i}:{i:number}) => isSelected(i) ? <SelectIndicator /> : null 
   
   
    const formatContent = ({ textValue, icon }:{ textValue: string; icon: any }) => <> {icon} || {textValue} </>

    return (
        <ControlGroup>
            <CustomLabel value={controlGroupLabel} />
            <SelectRoot
                open={isOpen}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>  
                        <> {separator} {separatorText} </> 
                        <ChevronDownIcon />  
                    </Text>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {separators.map((separator: ISeparator, index: number) => {
                            const { textValue, value } = separator

                            return (
                                <SelectRadioItem
                                    key={hash(textValue, value)}
                                    value={evaluate(value)}
                                    textValue={textValue}
                                    onSelect={() => handleSelection(index)}
                                >
                                    <SelectionIndicator index={index} />
                                    <SelectableText> 
                                        <> {formatContent({ ...separator })} </>
                                    </SelectableText>
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