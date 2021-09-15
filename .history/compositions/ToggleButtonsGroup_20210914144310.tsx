import { ReactNode } from 'react'
import { ToggleGroup, ToggleGroupButton } from '../primitives/Toggle'
import { Tooltip } from '../primitives/Tooltip'

interface IItem {
    id: number | string;
    value: string;
    textValue: string;
    alt: string | number | undefined;
    icon: ReactNode | undefined; 
}

type ToggleType = 'single' | 'multiple' | undefined
type OrientationType = "horizontal" | "vertical" | undefined
type DirectionType = 'ltr' | 'rtl' | undefined

enum ToggleType {
    SINGLE = 'singe',
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

const ToggleTypes: ToggleType[] = [ToggleTyple.SINGLE, ToggleType.MULTIPE]
const Orientations: OrientationType[] = [Orientation.HORIZONTAL, Orientation.VERTICAL];
const Directions: DirectionType[] = [ Direction.LTR, Direction.RTL];

interface IToggleButtonGroupProps {
    type: ToggleType;
    selectedIndex: number;
    setSelectedIndex: (value: string) => void;
    selectedValue: string;
    isDisabled: boolean;
    direction: string;
    orientation: string;
    rovingFocus: boolean;
    loop: boolean;
    ariaLabel?: string;
    groupName: string;
    items: IItem[];
}

const labelize =  (name: string, inputLabel?: string) => `${inputLabel || name}-toggle-group`

export const ToggleButtonGroup = ({
    type = ToggleType.SINGLE,
    selectedIndex,
    setSelectedIndex,
    selectedValue,
    isDisabled = false,
    direction = Direction.LTR,
    orientation = Orientation.HORIZONTAL,
    rovingFocus = true,
    loop = true,
    ariaLabel,
    groupName = '',
    items
}: IToggleButtonGroupProps) => {

    return (
            <ToggleGroup 
                type={type}
                value={selectedValue}
                onValueChange={(value: string) => setSelectedIndex(parseInt(value))}
                orientation={orientation}
                dir={direction}
                rovingFocus={rovingFocus}
                loop={loop}
                disabled={isDisabled}
                aria-label={labelize(ariaLabel, groupName)}
            >
                 {items.map((item: IItem) => (
                     <Tooltip 
                        key={index} 
                        content={`${item.value}`.toUpperCase()}
                    >
                         <ToggleGroupButton
                             key={`item-at-${selectedIndex}`}
                             value={`${item.id}`}
                         >
                             {item.icon}
                         </ToggleGroupButton>
                     </Tooltip>
                 ))}
            </ToggleGroup>
    );
}