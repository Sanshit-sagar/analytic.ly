import React, { useState } from 'react'


import { IPageSizeSelector } from '../interfaces'

let pageSizes = [5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];
// items, 
// selectedIndex, 
// setSelectedIndex, 
// selectedValue, 
// selectedTextValue, 
// group 

const PAGE_SIZES_LABEL = 'Page Sizes'

export const PageSizeSelector = ({ loading, pageSize, setPageSize }: IPageSizeSelector) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(6);
    const [selectedSize, setSelectedSize] = useState<number>(pageSizes[selectedIndex])

    const updatePageSize = (updatedIndex: number) => {
        if(updatedIndex !== selectedIndex) {
            setSelectedIndex(updatedIndex)
            setSelectedSize(pageSizes[selectedIndex])
        }
    }

    return {
        <SelectMenu
            items={pageSizes}
            selectedIndex={pageSize}
            setSelectedIndex={updatePageSize}
            selectedValue={selectedSize}
            selectedTextValue={`${selectedSize} items`}
            group={PAGE_SIZES_LABEL}
        />
    }
);

    // const handleValueChange = () => console.log(`Updated the value`);

    // return (
        // <SelectRoot 
            // open={open} 
            // onOpenChange={() => {setOpen(!open)}}
        // >
            {/* <SelectTrigger> */}
                {/* <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$5' }}> */}
                    {/* <Text as='span'> {`Showing ${loading ? '...' : pageSize}`}</Text> */}
                    {/* {!loading && <ChevronDownIcon /> } */}
                {/* </Flex> */}
            {/* </SelectTrigger> */}
            {/* <SelectContent> */}
                {/* <SelectRadioGroup  */}
                    // value={pageSize}
                    // onValueChange={handleValueChange}
                // >
                    {/* {items.map((itemPageSize) => ( */}
                        // <SelectRadioItem  
                            // key={itemPageSize} 
                            // onSelect={() => updatePageSize(itemPageSize)}
                            // css={{ width: '100%', bc: 'transparent' }}
                        // >
                            {/* <SelectItemIndicator> */}
                                {/* <DotFilledIcon /> */}
                            {/* </SelectItemIndicator> */}
                            {/* <Text as='span'> Show {itemPageSize} </Text> */}
                        {/* </SelectRadioItem> */}
                    // ))}
                {/* </SelectRadioGroup> */}
            {/* </SelectContent> */}
        {/* </SelectRoot> */}
    // )
// }