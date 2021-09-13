import SelectMenu from '../../../compositions/SelectMenu'
import { IItem } from '../../../compositions/SelectMenu'

import { atom, useAtom } from 'jotai' 
import { useAtomValue } from 'jotai/utils'

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

const pageSizeIndexAtom = atom(2)
const pageSizeValueAtom = atom((get) => pageSizes[get(pageSizeIndexAtom)].value)
const pageSizeTextValueAtom = atom((get) => pageSizes[get(pageSizeIndexAtom)].textValue)

function getItem(ps:{ value: number, textValue: string }): IItem {
    return { 
        value: `${ps.value, 
        textValue: ps.textValue, 
        alt: undefined, 
        icon: undefined 
    }
}

export const PageSizeSelector = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(pageSizeIndexAtom)
    const selectedTextValue = useAtomValue(pageSizeTextValueAtom)

    const updatePageSize = (updatedIndex: number) => setSelectedIndex(updatedIndex)

    return (
        <SelectMenu
            selectOnly={true}
            items={pageSizes.map((ps) => getItem(ps))}
            selectedIndex={selectedIndex}
            setSelectedIndex={(value: number) => updatePageSize(value)}
            selectedValue={selectedTextValue}
            selectedTextValue={`${selectedTextValue} rows`}
            group={PAGE_SIZES_LABEL}
        />
    );
}