import { StyledText as TextPrimitive } from '../primitives/Text';
import './text.css';

interface TextProps {
    size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
    variant: 'red' | 'crimson' | 'pink' | 'purple' | 'cyan'
    label: string
}

export const Text = ({ size, label }: TextProps) => (
    <TextPrimitive
        size={size}
        variant={color}
    >
        {label}
    </TextPrimitive>
);
