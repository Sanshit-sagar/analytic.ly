import { ToggleGroup, ToggleGroupButton } from '../primitives/Toggle'
import { Tooltip } from '../primitives/Tooltip'


const ToggleButtonGroup = ({

    selectedIndex,
    setSelectedIndex,
    isDisabled,
    rovingFocus = true,
    ariaLabel,
    groupName,
    items
}) => {

    return (
            <ToggleGroup 
                 type=
                 value={`${zoomIndex}`}
                 onValueChange={(value: string) => setZoomIndex(parseInt(value))}
                 orientation={'horizontal'}
                 dir={'ltr'}
                 rovingFocus={true}
                 loop={true}
                 disabled={zoomDisabled}
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