


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

const items: IItem[] = [
    { value: '0', textValue: 'lithium', alt: undefined, icon: undefined },
    { value: '1', textValue: 'magnesium', alth: undefined, icon: undefined },
    { value: '1', textValue: 'copper', alth: undefined, icon: undefined },
    { }
]

export const Select = ({ 
    selectOnly = false,
    items = defaultItems,
    selectedIndex = 0,
    setSelectedIndex,
    selectedTextValue
    group = 'atomic.select.test_group'
}: ISelectMenuProps) => {

    return (

    )
}