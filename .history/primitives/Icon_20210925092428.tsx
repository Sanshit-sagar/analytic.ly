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

type IAccessibleIconProps = Omit<IAccessibleIconProps, 'tooltipProps'> & IconProps


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
    let { label, children, tooltipProps, ...otherProps } = props

    return (
        <Tooltip content={content}>
            <Icon label={label} {...otherProps}>
                {children}
            </Icon>
        </Tooltip>
    );
};