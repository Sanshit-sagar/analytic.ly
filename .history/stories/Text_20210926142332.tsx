import { StyledText as TextPrimitive } from '../primitives/Text';
import './text.css';

interface TextProps {
    size: '1' | '2' | '3' | '4' | '5' | '6' | ''
    variant: 'red' | 'crimson' | 'pink' | 'purple' | 'cyan'
    label: string
}

export const Text = ({ size, label }: TextProps) => (
    <TextPrimitive
        size={size}
    >
        {label}
    </TextPrimitive>
);
