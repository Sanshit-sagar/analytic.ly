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
    'medium': false; 'source': false; 'term': false; 'content': false; 'campaign': false}

const Matches = () => {

}


const MatchedUrchins = () => {
    

    return (
        <Collapsible>
            

        </Collapsible> 
    )
}