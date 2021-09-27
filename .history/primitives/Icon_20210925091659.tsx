
import { Text } from './Text'
import { Tooltip } from './Tooltip'

type IAccessibleIconProps = {
    label: string; 
    children: React.ReactNode;  
}
type IAccessibleIconWithTooltipProps = Pick<IAccessibleIconProps, '


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