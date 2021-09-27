import { Text } from './Text'
import { Tooltip } from './Tooltip'

import { IconProps } from '@radix-ui/react-icons/dist/types'
import { TooltipProps } from '@radix-ui/react-tooltip/dist/types'

import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type IAccessibleIconWithTooltipProps = {
    label: string;   
    children: React.ReactNode;
    tooltipProps: IconProps & TooltipProps;
}

type IAccessibleIconProps = Pick<IAccessibleIconWithTooltipProps, 'label'> & IconProps & React.ReactNode; 


export const Icon = ({ label, iconProps, children }: IAccessibleIconProps) => {
   
    
    return (
        <AccessibleIcon.Root label={label}>
            <Text css={{ color: '$text'}}>
                {children}
            </Text>
        </AccessibleIcon.Root>
    );
}



export const IconWithTooltip = (props: IAccessibleIconWithTooltipProps) => {
    let { label, children, tooltipProps, ...iconProps } = props

    return (
        <Tooltip content={label}>
            <Icon label={label} iconProps={iconProps}>
                {children}
            </Icon>
        </Tooltip>
    );
};