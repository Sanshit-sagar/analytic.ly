import { Text } from './Text'
import { Tooltip } from './Tooltip'

import { IconProps } from '@radix-ui/react-icons/dist/types'
import { TooltipProps } from '@radix-ui/react-tooltip/dist/types'

import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type IAccessibleIconWithTooltipProps = {
    content: string;   
    children: IAccessibleIconProps & React.ReactNode;
    tooltipProps: IconProps & TooltipProps;
}

type IAccessibleIconProps = Pick<IAccessibleIconWithTooltipProps, 'content'> & IconProps & React.ReactNode; 


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
    let { content, children, tooltipProps, ...iconProps } = props

    return (
        <Tooltip content={content} {...tooltipProps}>
            <Icon label={content} iconProps={iconProps} children={children} />
                {children}
            </Icon>
        </Tooltip>
    );
};