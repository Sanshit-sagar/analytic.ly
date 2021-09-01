import React, { useState } from 'react'

import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectRadioGroup,
    SelectRadioItem,
    SelectItemIndicator
} from '../../../primitives/Select'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { 
    ChevronDownIcon, 
    DotFilledIcon 
} from '@radix-ui/react-icons'
import { IPageSizeSelector } from '../interfaces'

export const PageSizeSelector = ({ loading, pageSize, setPageSize }: IPageSizeSelector) => {
    let items = [5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];
    const [open, setOpen] = useState(false);

    const updatePageSize = (updatedPageSize: number) => {
        if(updatedPageSize !== pageSize) {
            setPageSize(updatedPageSize)
        }
    }

    const handleValueChange = () => console.log(`Updated the value`);

    return (
        <SelectRoot 
            open={open} 
            onOpenChange={() => {setOpen(!open)}}
        >
            <SelectTrigger>
                <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$5' }}>
                    <Text> {`Showing ${loading ? '...' : pageSize}`}</Text>
                    {!loading && <ChevronDownIcon /> }
                </Flex>
            </SelectTrigger>
            <SelectContent>
                <SelectRadioGroup 
                    value={pageSize}
                    onValueChange={handleValueChange}
                >
                    {items.map((itemPageSize) => (
                        <SelectRadioItem  
                            key={itemPageSize} 
                            onSelect={() => updatePageSize(itemPageSize)}
                            css={{ width: '100%', bc: 'transparent' }}
                        >
                            <SelectItemIndicator>
                                <DotFilledIcon />
                            </SelectItemIndicator>
                            <Text> Show {itemPageSize} </Text>
                        </SelectRadioItem>
                    ))}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
    )
}