import { StyledText as TextPrimitive } from '../primitives/Text';
import './text.css';

interface TextProps {
    size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
    color: 'violet' | 'indigo' | 'blue' | 'purple' | 'teal' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' 
    label: string
}

export const Text = ({ 
    size = '4',
    label = 'atomic.text', 
    color = 'blue'
}: TextProps) => (
    <TextPrimitive
        size={size}
        variant={color}
    >
        {label}
    </TextPrimitive>
);
