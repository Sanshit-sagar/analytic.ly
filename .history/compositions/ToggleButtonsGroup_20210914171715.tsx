import { ReactNode } from 'react'
import { ToggleGroup as GroupedToggles, ToggleGroupButton as ToggleItem } from '../primitives/Toggle'
import { Tooltip } from '../primitives/Tooltip'

type ToggleType = 'single' | 'multiple' | undefined
type OrientationType = "horizontal" | "vertical" | undefined
type DirectionType = 'ltr' | 'rtl' | undefined

enum Toggle {
    SINGLE = 'single',
    MULTIPLE = 'multiple'
};

enum Orientation {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};

enum Direction {
    LTR = 'ltr',
    RTL = 'rtl'
};

export const ToggleTypes: ToggleType[] = [Toggle.SINGLE, Toggle.MULTIPLE]
export const Orientations: OrientationType[] = [Orientation.HORIZONTAL, Orientation.VERTICAL];
export const Directions: DirectionType[] = [ Direction.LTR, Direction.RTL];

interface IItem {
    id: number;
    value: string;
    textValue: string;
    alt?: string | number | undefined;
    icon?: ReactNode | undefined; 
}

interface IToggleButtonGroupProps {
    groupName: string;
    items: IItem[];
    type: ToggleType;
    selectedIndex: string;
    setSelectedIndex: (value: number) => void;
    selectedValue: string;
    selectedTextValue: string; 
    isDisabled?: boolean;
    direction?: DirectionType;
    orientation?: OrientationType;
    rovingFocus?: boolean;
    loop?: boolean;
    ariaLabel?: string;
}

const labelize =  (name: string, inputLabel?: string) => `${inputLabel || name}-toggle-group`

export const ToggleGroup = ({
    type = Toggle.SINGLE,
    selectedIndex,
    setSelectedIndex,
    selectedValue,
    selectedTextValue,
    isDisabled = false,
    direction = Direction.LTR,
    orientation = Orientation.HORIZONTAL,
    rovingFocus = true,
    loop = true,
    ariaLabel,
    groupName,
    items
}: IToggleButtonGroupProps) => {

    return (
        <GroupedToggles 
            type={type}
            value={selectedValue}
            onValueChange={(value: string) => setSelectedIndex(parseInt(`${value}`))}
            orientation={orientation}
            dir={direction}
            rovingFocus={rovingFocus}
            loop={loop}
            disabled={isDisabled}
            aria-label={labelize(ariaLabel || '', groupName)}
        >
            {items.map((item: IItem, index: number) => (
                <Tooltip 
                    key={item.id} 
                    content={`${item.id || '-'}`.toUpperCase()}
                >
                    <ToggleItem
                        key={`item-at-${selectedIndex}`}
                        value={`${index}`}
                    >
                        {item.icon || selectedTextValue}
                    </ToggleItem>
                </Tooltip>
            ))}
        </GroupedToggles>
    );
}