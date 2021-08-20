import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { IconProps } from '@radix-ui/react-icons/dist/types';

interface IAccessibleIconProps {
    label: string; 
    children: Element | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

export const Icon = ({ label = 'icon', children = undefined }: IAccessibleIconProps) => {
    return (
        <AccessibleIcon.Root label={label}>
            {children}
        </AccessibleIcon.Root>
    );
}
