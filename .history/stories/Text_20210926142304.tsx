import { StyledText as TextPrimitive } from '../primitives/Text';
import './text.css';

interface TextProps {
    size: '1' | '2' | '3' | '4'
    variant: 'red' | 'crimson' | 'pink' | 'purple'
    label: string
}

export const Text = ({ size, label }: TextProps) => (
    <TextPrimitive
        size={size}
    >
        {label}
    </TextPrimitive>
);
