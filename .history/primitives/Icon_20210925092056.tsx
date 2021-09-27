import { Text } from './Text'
import { Tooltip } from './Tooltip'

import { IconProps } from '@radix-ui/react-icons/dist/types'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type IAccessibleIconWithTooltipProps = {
    label: string;   
    props: IconProps;
    children: React.ReactNode;
}

type IAccessibleIconWithTooltipProps = Pick<IAccessibleIconProps, '


export const Icon = (props: IAccessibleIconProps) => {
   
    
    return (
        <AccessibleIcon.Root label={label}>
            <Text css={{ color: '$text'}}>
                {children}
            </Text>
        </AccessibleIcon.Root>
    );
}



export const IconWithTooltip = (props: IAccessibleIconWithTooltipProps) => {
    let { content, label, children, ...otherProps } = props

    return (
        <Tooltip content={content}>
            <Icon label={label} {...otherProps}>
                {children}
            </Icon>
        </Tooltip>
    );
};