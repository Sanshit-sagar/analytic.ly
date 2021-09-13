import { useState } from 'react'

import SelectMenu from '../../../compositions/SelectMenu'

let pageSizes: IItem[] = [
    { key: 0, value: 5, textValue: '5', icon: undefined, alt: undefined, },
    { key: 1, value: 10, textValue: '10', icon: undefined, alt: undefined, },
    { key: 2, value: 15, textValue: '5', icon: undefined, alt: undefined, },
    { key: 3, value: 20, textValue: '5', icon: undefined, alt: undefined, },
    { key: 4, value: 25, textValue: '5', icon: undefined, alt: undefined, },
    { key: 5, value: 30, textValue: '5', icon: undefined, alt: undefined, },
    { key: 6, value: 50, textValue: '5', icon: undefined, alt: undefined, },
    { key: 7, value: 75, textValue: '5', icon: undefined, alt: undefined, },
        6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];

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