import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 

export const SlugCategorySelector = () => {

    
}

export const SlugTabContent = () => {

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'>
                Select a category that should be used to generate a Slug.
            </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
               <Label> Choose a Category </Label>
               

            </UrlFieldSet>
        </Flex>
    )   
}


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

export default ThemeSelector