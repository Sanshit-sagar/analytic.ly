import React, { useState } from 'react'
import { Text } from '../../../primitives/Text'
import { 
    ToolbarToggleItem, 
    ToolbarToggleGroup 
} from '../../../primitives/Toolbar'
import { 
    DoubleArrowLeftIcon, 
    DoubleArrowRightIcon, 
    ChevronLeftIcon, 
    ChevronRightIcon 
} from '@radix-ui/react-icons'
import { IPaginator } from '../interfaces'

export const Paginator = ({ 
    loading, 
    pageIndex, 
    pageCount, 
    canPreviousPage, 
    canNextPage, 
    gotoPage, 
    nextPage, 
    previousPage, 
    pageOptions,
}: IPaginator) => {

    const [pageValue, setPageValue] = useState("none")
 
    const execTransition = (destination: string) => {
       
        if (destination==='first') {
            gotoPage(0)
        } else if (destination==='prev') {
            previousPage()
        } else if (destination==='next') {
            nextPage()
        } else {
            gotoPage(pageCount - 1)
        }
    }

    const isMovePossible = (index: string) => {
        if (index==='prev') return canPreviousPage
        if (index==='next') return canNextPage 
        if (index==='last') return (pageIndex<pageOptions.length-1)
        return pageIndex!==0; 
    }

    let iterationOptions = [
        { label: "First Page", value: "first", icon: <DoubleArrowLeftIcon />, },
        { label: "Previous Page", value: "prev", icon: <ChevronLeftIcon /> },
        { label: "Next Page", value: "next", icon: <ChevronRightIcon /> },
        { label: "Last Page", value: "last", icon: <DoubleArrowRightIcon />  },
    ];

    return (
        <ToolbarToggleGroup 
            type="single" 
            value={pageValue}
            onValueChange={(value: string) => { 
                let canMove = isMovePossible(value);
                if(canMove) {
                    setPageValue(value)
                    execTransition(value)
                }
            }}
            aria-label="pagination-controls"
        >
            {iterationOptions.map((option, index) => {
                return (
                    <ToolbarToggleItem
                        key={index}
                        value={option.value}
                        aria-label={`pagination-button-${option.label}`}
                    >
                        <Text 
                            size='1' 
                            css={{ color: '$text' }}
                        > {loading ? 'loading...' : option.icon} </Text>
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    );
}