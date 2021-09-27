import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { Text } from './Text'

type IAccessibleIconProps = {
    label: string; 
    children: React.ReactNode;  
}
type IAccessibleIconWithTooltipProps = Pick<IAccessibleIconProps, 'label' extends keyof IAccessibleIconProps ? 'label' : 'content'


export const Icon = ({ label = 'icon', children }: IAccessibleIconProps) => {
    
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