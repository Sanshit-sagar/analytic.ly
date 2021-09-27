import { Text } from './Text'
import { Tooltip } from './Tooltip'

import { IconProps } from '@radix-ui/react-icons/dist/types'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type IAccessibleIconProps = {
    label: string; 
    children: React.ReactNode;  
} & IconProps

type IAccessibleIconWithTooltipProps = Pick<IAccessibleIconProps, '


export const Icon = ({ label = 'icon', children, ... }: IAccessibleIconProps) => {
    
    return (
        <AccessibleIcon.Root label={label}>
            <Text css={{ color: '$text'}}>
                {children}
            </Text>
        </AccessibleIcon.Root>
    );
}



export const IconWithTooltip = ({ label, content = 'icon', children }: IAccessibleIconWithTooltipProps) => (
    <Tooltip content={content}>
        <Icon label={label}>
            {children}
        </Icon>
    </Tooltip>
);