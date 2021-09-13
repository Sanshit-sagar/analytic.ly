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
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { DotFilledIcon, TriangleDownIcon } from '@radix-ui/react-icons'

export interface IItem {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
}

interface ISelectMenuProps {
    selectOnly?: boolean, // return select w/o control group + label
    items: IItem[];
    selectedIndex: number;
    setSelectedIndex: (value: number) => void;
    selectedValue: string;
    selectedTextValue: string; 
    group: string; 
};

interface IFormatContentProps { 
    textValue: string; 
    icon: any 
};

const evaluate = (value: string | number): string => typeof value==='number' ? `${value}` : value
const getHashFromValue = (group: string, a: string, b?: string):string => `${group}-item-${a}-value-${b || ''}`
const getHashFromIndex = (group: string, i: number): string => `${group}-item-index-${i}`
const hash = (controlGroupName: string, a?: string, b?: string, i?: number): string => {
     let group = controlGroupName || `Group-${Math.random()}`
     return a && b ? getHashFromValue(group, a, b) : i ? getHashFromIndex(group, i) : `${Math.random()}`;
};

const SelectMenuLoc = ({ 
    items, 
    selectedIndex, 
    setSelectedIndex, 
    selectedValue, 
    selectedTextValue, 
    group 
}: ISelectMenuProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const SelectionIndicator = ({ index }: { index: number }) => {
        if(index!==selectedIndex) return null;
        return <SelectIndicator children={<DotFilledIcon />} />;
    }
    const formatContent = ({ textValue, icon }: IFormatContentProps) => <> {icon || textValue} </>
    const handleSelection = (selIndex: number): void => setSelectedIndex(selIndex)

    return (
        <SelectRoot
            open={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <SelectTrigger>
                <Text css={{  width: '100%', display: 'inline-flex', jc: 'space-between', ai: 'center', gap: '$2', padding: '$1'}}>  
                    <> {selectedTextValue} </> 
                    <TriangleDownIcon />  
                </Text>
            </SelectTrigger>

            <SelectContent>
                <SelectRadioGroup>
                    {items.map((item: IItem, index: number) => {
                        const { textValue, value, icon } = item
                    
                        return (
                            <SelectRadioItem
                                key={hash(group, textValue, value)}
                                value={evaluate(value)}
                                textValue={textValue}
                                onSelect={() => handleSelection(index)}
                            >
                                <SelectableText> 
                                    {index===select<SelectionIndicator />
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

function SelectMenu(props: ISelectMenuProps) {
    if(props.selectOnly) return <SelectMenuLoc {...props} />

    return (
        <ControlGroup>
            <Label>{props.group.toUpperCase() || ''}</Label>
            <Box css={{ mt: '$2'}}>
                <SelectMenuLoc {...props} />
            </Box>
        </ControlGroup>
    );

}

export default SelectMenu