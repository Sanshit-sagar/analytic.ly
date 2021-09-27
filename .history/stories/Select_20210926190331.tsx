import { SelectMenu } from '../compositions/SelectMenu'


export interface IItem {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
}

interface ISelectMenuProps {
    selectOnly?: boolean, // return select w/o control group + label
    items: IItem[];
    selectedIndex: number;
    setSelectedIndex: (value: number) => void;
    selectedValue: string;
    selectedTextValue: string; 
    group: string; 
}

const defaultItems: IItem[] = [
    { value: '0', textValue: 'lithium', alt: undefined, icon: undefined },
    { value: '1', textValue: 'magnesium', alt: undefined, icon: undefined },
    { value: '2', textValue: 'copper', alt: undefined, icon: undefined },
    { value: '3', textValue: 'graphite', alt: undefined, icon: undefined },
]

export const Select = ({ 
    selectOnly = false,
    items = defaultItems,
    selectedIndex = 0,
    setSelectedIndex,
    selectedTextValue = defaultItems[selectedIndex].textValue,
    group = 'atomic.select.test_group'
}: ISelectMenuProps) => {

    return (
        <SelectMenu
            
    )
}