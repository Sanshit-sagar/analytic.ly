import React, { useState } from 'react'

import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    CollapsiblePanel,
    CollapsibleTogglerWithIcon as CollapsibleToggle,
    CollapsiblePanelText as PanelText,
    CollapsibleText as Text,
} from '../../../primitives/Collapsible'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

const openUrchins = { 
    'medium': false; 
    'source': false; 
    'term': false; 
    'content': false; 
    'campaign': false;
}

const Matches = () => {

}


const MatchedUrchins = () => {
    const [open, setOpen] = useState(false)    

    const handleOpenChange = () => setOpen(!open)

    return (
        <Collapsible open={open} onOpenChange={handleOpenChange}>
            <Text> found xx matches for ____ </Text>
            <CollapsibleTrigger> 
                <CollapsibleToggle />
            </CollapsibleTrigger>


            <CollapsiblePanel>
                /result1
            </CollapsiblePanel>

            <CollapsibleContent>

            

        </Collapsible> 
    )
}