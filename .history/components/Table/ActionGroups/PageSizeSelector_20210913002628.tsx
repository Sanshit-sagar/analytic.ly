import { useState } from 'react'

import SelectMenu from '../../../compositions/SelectMenu'

let pageSizes = [5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];

const PAGE_SIZES_LABEL = 'Page Sizes'

export const PageSizeSelector = () => {
  
    const [selectedIndex, setSelectedIndex] = useState<number>(6);
    const [selectedSize, setSelectedSize] = useState<string>(`${pageSizes[selectedIndex]}`)

    const updatePageSize = (updatedIndex: number) => {
        if(updatedIndex !== selectedIndex) {
            setSelectedIndex(updatedIndex)
            setSelectedSize(`${pageSizes[selectedIndex]}`)
        }
    }

    return (
        <SelectMenu
            items={pageSizes}
            selectedIndex={selectedIndex}
            setSelectedIndex={(value: number) => updatePageSize(value)}
            selectedValue={selectedSize}
            selectedTextValue={`${selectedSize} items`}
            group={PAGE_SIZES_LABEL}
        />
    );
}