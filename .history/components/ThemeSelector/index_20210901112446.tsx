import React from 'react'
import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectRadioGroup,
    SelectRadioItem,
    SelectSeparator
} from '../../primitives/Select'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { ChevronDownIcon } from '@radix-ui/react-icons'

type ThemeType = 'bluegreen' | 'blackwhite' | 'orangepurple' 
type PanelType = 'blue' | 'white' | 'purple'
type AccentType = 'green' | 'gray' | 'orange'
type TextType = 'black' | 'white' 

interface SelectionOption {
    id: number;
    theme: ThemeType;
    panel: PanelType;
    accent: AccentType;
    text: TextType;
}

const themeOptions: SelectionOption[] = [
    {id: 0, theme: 'bluegreen', panel: 'blue', accent: 'green', text: 'white'},
    {id: 1, theme: 'blackwhite', panel: 'white', accent: 'gray', text: 'black'},
    {id: 2, theme: 'orangepurple', panel: 'purple', accent: 'orange', text: 'white'},
];

import { atom, useAtom } from 'jotai'

const isOpenAtom = atom(false)
const selectedIndexAtom = atom(0)
const selectedThemeOptionAtom = atom((get) => themeOptions[get(selectedIndexAtom) || 0])
export const themeAtom = atom((get) => get(selectedThemeOptionAtom).theme);
export const panelAtom = atom((get) => get(selectedThemeOptionAtom).panel);
export const accentAtom = atom((get) => get(selectedThemeOptionAtom).accent); 

export const ThemeSelections = () => {
    const [theme] = useAtom(themeAtom)
    const [panel] = useAtom(panelAtom)
    const [accent] = useAtom(accentAtom)

    return (
        <Text size='1'> 
          {theme} | {panel} | {accent}
        </Text>
    )
}

const ThemeSelector = () => {
    const [isOpen, setIsOpen] = useAtom(isOpenAtom)
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom); 
           
    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                        {themeOptions[selectedIndex].theme} 
                        <ChevronDownIcon />
                    </Flex>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {themeOptions.map((option: SelectionOption, index: number) => {
                            return (
                                <SelectRadioItem
                                    key={index}
                                    onSelect={() => setSelectedIndex(index)}
                                    css={{ textTransform: 'uppercase' }}
                                >
                                    <Text size='1'>{option.theme}</Text> 
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    )
}

export default ThemeSelector