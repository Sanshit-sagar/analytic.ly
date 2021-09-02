import React from 'react'

import {
    DropdownMenuIcon,
    CaretSortIcon, 
    CheckboxIcon,
    InputIcon,
    CalendarIcon
} from '@radix-ui/react-icons'

import {
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../../../primitives/Toolbar'

import { Text } from '../../../primitives/Text'
import { PrimitiveAtom, useAtom, atom } from 'jotai'

export const actionsArr = [
    { id: 'filter', category: 'Filter', state: '', icon: <DropdownMenuIcon /> },
    { id: 'sort', category: 'Sort', state: '', icon: <CaretSortIcon /> },
    { id: 'select', category: 'Select', state: '', icon: <CheckboxIcon /> },
    { id: 'search', category: 'Search', state: '', icon: <InputIcon /> },
    { id: 'range', category: 'Range', state: '', icon: <CalendarIcon /> }
];    

export const selectedMiscActionAtom: PrimitiveAtom<string> = atom('')

const SortFilters = ({ loading }: { loading: boolean }) => {
    const [selectedMiscAction, setSelectedMiscAction] = useAtom(selectedMiscActionAtom)
    const handleSelectionChange = (updatedSelection: string) => setSelectedMiscAction(updatedSelection);

    return (
        <ToolbarToggleGroup
            type="multiple" 
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            {actionsArr.map(function(action, index) {
                return (
                    <ToolbarToggleItem 
                        key={}
                        value={selectedMiscAction} 
                        onValueChange={handleSelectionChange}
                    > 
                        <Text as='span' css={{ mr: '$5', color: '$text' }}> {loading ? '...' : action.category} </Text> 
                        {action.icon}
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    );
}

export default SortFilters