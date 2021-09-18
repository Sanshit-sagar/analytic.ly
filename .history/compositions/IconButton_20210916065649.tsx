
import { Icon } from '../primitives/Icon'
import { Tooltip } from '../primitives/Tooltip'
import { IconButton } from '../primitives/IconButton'
import { IconProps } from '@radix-ui/react-icons/dist/types'

interface IIconButtonWithTooltipProps {
    label: string;
    onClick: () => void;
    i
}

const IconButtonWithTooltip = ({ label, onClick, icon }: IIconButtonWithTooltipProps) => {

    return (
        <Tooltip content={'Remove test from configuration'}>
            <IconButton
                size='1' 
                variant='ghost'
                onClick={onClick}
            >
                <Icon label={label}>
                    {icon}
                </Icon>
            </IconButton>
        </Tooltip>
    )
}