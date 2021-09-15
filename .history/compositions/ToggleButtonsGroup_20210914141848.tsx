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
                 type='single'
                 value={`${zoomIndex}`}
                 onValueChange={(value: string) => setZoomIndex(parseInt(value))}
                 orientation={'horizontal'}
                 dir={'ltr'}
                 rovingFocus={true}
                 loop={true}
                 disabled={zoomDisabled}
                 aria-label='zoom-selection-options'
            >
                 {items.map((zoomOption, index) => (
                     <Tooltip content={zoomOption.value.toUpperCase()}>
                         <ToggleGroupButton
                             key={index}
                             value={`${zoomOption.id}`}
                         >
                             {zoomOption.icon}
                         </ToggleGroupButton>
                     </Tooltip>
                 ))}
            </ToggleGroup>
    );
}