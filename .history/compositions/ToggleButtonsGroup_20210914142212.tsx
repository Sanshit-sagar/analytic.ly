import { ToggleGroup, ToggleGroupButton } from '../primitives/Toggle'
import { Tooltip } from '../primitives/Tooltip'

function labelize(inputLabel: string, name: string) {
    return inputLabel ? `$`
}

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
}) => {

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
                 aria-label={labelize(ariaLabel || '', groupName)}
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