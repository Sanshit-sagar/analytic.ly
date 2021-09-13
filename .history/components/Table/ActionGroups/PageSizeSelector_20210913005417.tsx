import { useState } from 'react'

import SelectMenu from '../../../compositions/SelectMenu'
import { atom, useAtom } from 'jotai' 



let pageSizes = [
    { key: 0, value: 5, textValue: '5', icon: undefined, alt: undefined, },
    { key: 1, value: 10, textValue: '10', icon: undefined, alt: undefined, },
    { key: 2, value: 15, textValue: '15', icon: undefined, alt: undefined, },
    { key: 3, value: 20, textValue: '20', icon: undefined, alt: undefined, },
    { key: 4, value: 25, textValue: '25', icon: undefined, alt: undefined, },
    { key: 5, value: 30, textValue: '30', icon: undefined, alt: undefined, },
    { key: 6, value: 50, textValue: '50', icon: undefined, alt: undefined, },
    { key: 7, value: 75, textValue: '75', icon: undefined, alt: undefined, },
];

const PAGE_SIZES_LABEL = 'Page Sizes'

const tablePageSizeIndexAtom = atom<number>(2)
const tablePageSizeValueAtom = atom((get) => pageSizes[get(tablePageSizeIndexAtom)].textValue)
const setPageIndexAtom = atom(
    null,
    (_get, set, update: React.SetStateAction<number>) => set(tablePageSizeIndexAtom, update)
)

export const PageSizeSelector = () => {
  
    // const [selectedIndex, setSelectedIndex] = useState<number>(6);
    // const [selectedSize, setSelectedSize] = useState<string>(pageSizes[selectedIndex].textValue)
    const selectedIndex = useAtomValue(tablePageSizeIndexAtom)
    const selectedValue = useAtomValue(tablePageSizeValueAtom)

    const updatePageSize = (updatedIndex: number) => {
        // setSelectedIndex(updatedIndex)
        // setSelectedSize(pageSizes[updatedIndex].textValue)
        setSelectedIndex(updatedIndex)
    }

    return (
        <SelectMenu
            selectOnly={true}
            items={pageSizes}
            selectedIndex={selectedIndex}
            setSelectedIndex={(value: number) => updatePageSize(value)}
            selectedValue={selectedSize}
            selectedTextValue={`${selectedSize} rows`}
            group={PAGE_SIZES_LABEL}
        />
    );
}