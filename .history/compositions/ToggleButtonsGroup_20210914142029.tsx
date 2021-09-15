import { ToggleGroup, ToggleGroupButton } from '../primitives/Toggle'
import { Tooltip } from '../primitives/Tooltip'


const ToggleButtonGroup = ({
    type = 'single',
    selectedIndex,
    setSelectedIndex,
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
                 value={`${selectedIndex}`}
                 onValueChange={(value: string) => setSelectedIndex(parseInt(value))}
                 orientation={'horizontal'}
                 dir={'ltr'}
                 rovingFocus={true}
                 loop={loop}
                 disabled={isDisabled}
                 aria-label='zoom-selection-options'
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