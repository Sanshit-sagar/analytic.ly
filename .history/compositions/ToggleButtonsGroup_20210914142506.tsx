import { ToggleGroup, ToggleGroupButton } from '../primitives/Toggle'
import { Tooltip } from '../primitives/Tooltip'

interface IToggleButtonGroupProps {
    type: string;
    selectedIndex: number;
    setSelectedIndex: (value: string) => void;
    selectedValue: string;
    isDisabled: boolean;
    direction: string = 'ltr';
    orientation: string = 'horizontal';
    rovingFocus: boolean; = true,
    loop = true,
    ariaLabel,
    groupName,
    items
}

const labelize =  (inputLabel?: string, name: string) => `${inputLabel || name}-toggle-group`

const ToggleButtonGroup = ({
    type = 'single',
    selectedIndex,
    setSelectedIndex,
    selectedValue,
    isDisabled,
    direction = 'ltr',
    orientation = 'horizontal',
    rovingFocus = true,
    loop = true,
    ariaLabel,
    groupName,
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
                 {items.map((item, index) => (
                     <Tooltip content={item.value.toUpperCase()}>
                         <ToggleGroupButton
                             key={index}
                             value={`${item.id}`}
                         >
                             {item.icon}
                         </ToggleGroupButton>
                     </Tooltip>
                 ))}
            </ToggleGroup>
    );
}