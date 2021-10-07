import React, { useState } from 'react'
import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectRadioGroup,
    SelectRadioItem,
    SelectableText
} from '../primitives/Select' 
import { Tooltip } from '../primitives/Tooltip'
import { ControlGroup, Label
} from '../primitives/FieldSet'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { ScrollArea } from '../primitives/ScrollArea'

import { DotFilledIcon, TriangleDownIcon } from '@radix-ui/react-icons'

export interface IItem {
    id?: string; 
    textValue: string;
    value: string | number;
    alt?: string | undefined;
    icon?: React.ReactNode | undefined;  
}

interface ISelectMenuProps {
    selectOnly?: boolean, // return select w/o control group + label
    items: IItem[];
    selectedIndex: number;
    setSelectedIndex: (value: number) => void;
    selectedValue: string;
    selectedTextValue: React.ReactNode; 
    group: string; 
}

const Selected = ({ icon, text }: { icon: React.ReactNode | undefined; text: string; }) => (
    <>  {icon} <Text size='1'> {text} </Text> </>
); 

const evaluate = (value: string | number): string => typeof value==='number' ? `${value}` : value
const getHashFromValue = (group: string, a: string, b?: string):string => `${group}-item-${a}-value-${b || ''}`
const getHashFromIndex = (group: string, i: number): string => `${group}-item-index-${i}`
const hash = (controlGroupName: string, a?: string, b?: string, i?: number): string => {
     let group = controlGroupName || `Group-${Math.random()}`
     return a && b ? getHashFromValue(group, a, b) : i ? getHashFromIndex(group, i) : `${Math.random()}`;
};

function sanitize(text: string) {
    return (text.length >= 12) ? text.substring(0,12) : text
}

const SelectMenuLoc = ({ 
    items, 
    selectedIndex, 
    setSelectedIndex, 
    selectedTextValue, 
    group 
}: ISelectMenuProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const handleSelection = (selIndex: number): void => setSelectedIndex(selIndex)

    return (
        <SelectRoot
            open={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <SelectTrigger>
                <Tooltip content={group}>
                    <Text css={{  width: '100%', display: 'inline-flex', jc: 'space-between', ai: 'center', gap: '$2', padding: '$1'}}>  
                        <> {
                                typeof selectedTextValue === 'string' 
                            ?   sanitize(selectedTextValue) 
                            :   selectedTextValue
                        } </> 
                        <TriangleDownIcon />  
                    </Text>
                </Tooltip>
            </SelectTrigger>

        
            <SelectContent>
                <ScrollArea>
                    <SelectRadioGroup>
                        {items.map(({ textValue, value, icon }: IItem, index: number) => (
                            <SelectRadioItem
                                key={hash(group, textValue, `${value}`)}
                                value={evaluate(value)}
                                textValue={textValue}
                                onSelect={() => handleSelection(index)}
                            >
                                {selectedIndex===index 
                                    ?  <DotFilledIcon /> 
                                    :  <Box css={{ width: '5px', bc: 'transparent' }} /> }
                                <SelectableText> 
                                    {icon || sanitize(textValue)}
                                </SelectableText>
                            </SelectRadioItem>
                        ))}
                        
                    </SelectRadioGroup>
                </ScrollArea>
            </SelectContent>
        </SelectRoot>
    );
}

function SelectMenu(props: ISelectMenuProps) {
    if(props.selectOnly) return <SelectMenuLoc {...props} />

    return (
        <ControlGroup>
            <Label>{props.group.toUpperCase() || ''}</Label>
            <Box css={{ mt: '$2', padding: '0' }}>
                <SelectMenuLoc {...props} />
            </Box>
        </ControlGroup>
    );

}

export default SelectMenu