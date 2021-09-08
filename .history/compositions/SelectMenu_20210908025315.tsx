import React, { useState } from 'react'
import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectRadioGroup,
    SelectRadioItem,
    SelectIndicator, 
    SelectableText
} from '../primitives/Select' 
import {
    ControlGroup,
    Label
} from '../primitives/FieldSet'
import { Text } from '../primitives/Text'
import { ChevronDownIcon } from '@radix-ui/react-icons'

const SEPARATOR_LABEL = 'SLUG_SEPARATORS'

interface ISelectionIndicatorProps {
    index:number; 
    selectedIndex: number
}

interface IItem {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
}

type IItems = IItem[]

interface ISelectMenuProps {
    items: IItems;
    index: number;
    setIndex: (value: number) => void;
    itemValue: string;
    itemTextValue: string; 
    group: string; 
};

interface IFormatContentProps { 
    textValue: string; 
    icon: any 
};

interface IGroupLabelProps {
    value: string;
}


const CustomLabel = ({ value }: IGroupLabelProps) => (
    <Label>
        <Text css={{ color: '$text' }}> {value} </Text>
    </Label>
);

const getHashFromValue = (group: string, a: string, b?: string):string => `${group}-item-${a}-value-${b || ''}`
const getHashFromIndex = (group: string, i: number): string => `${group}-item-index-${i}`
const hash = (controlGroupName: string, a?: string, b?: string, i?: number): string => {
     let group = controlGroupName || `Group-${Math.random()}`
     return a && b ? getHashFromValue(group, a, b) : i ? getHashFromIndex(group, i) : `${Math.random()}`;
};

const isSelected = (index: number, selectedIndex: number): boolean => index===selectedIndex
const SelectionIndicator = ({ index, selectedIndex }: ISelectionIndicatorProps) => {
    return isSelected(index,selectedIndex) ? <SelectIndicator /> : null 
}

const evaluate = (value: string | number): string => typeof value==='number' ? `${value}` : value


const SelectMenu = ({ 
    items, 
    selectedIndex, 
    setSelectedIndex, 
    selectedValue, 
    selectedTextValue, 
    group 
}: ISelectMenuProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleSelection = (selIndex: number): void => setSelectedIndex(selIndex)
    const formatContent = ({ textValue, icon }: IFormatContentProps) => <> {icon || textValue} </>

    return (
        <SelectRoot
            open={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <SelectTrigger>
                <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>  
                    <> {selectedValue} {selectedTextValue} </> 
                    <ChevronDownIcon />  
                </Text>
            </SelectTrigger>

            <SelectContent>
                <SelectRadioGroup>
                    {items.map((separator: ISeparator, index: number) => {
                        const { textValue, value, icon } = separator

                        return (
                            <SelectRadioItem
                                key={hash(group, textValue, value)}
                                value={evaluate(value)}
                                textValue={textValue}
                                onSelect={() => handleSelection(index)}
                            >
                                <SelectionIndicator 
                                    index={index} 
                                    selectedIndex={selectedIndex} 
                                />
                                <SelectableText> 
                                    {formatContent({ textValue, icon })} 
                                </SelectableText>
                            </SelectRadioItem>
                        );
                    })}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
    );
}

export const SelectMenu = ({ separatorIndexAtom, setSeparatorIndex, separatorAtom, separatorTextAtom, separators }) => {
    return (
        <ControlGroup>
            <CustomLabel value={group} />
                <SelectMenuLOC 
                    items={separators}
                    separatorIndex={separatorIndex}
                    setIndex={setSeparatorIndex}
                    item={separator}
                    itemText={separatorText}
                    itemGroupName={controlGroupLabel}
        /> 
    )
}

