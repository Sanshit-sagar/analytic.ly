import { Text as TextPrimitive } from '../primitives/Text';
import './text.css';

interface TextProps {
    size: '1' | '2' | '3' | '4'
    label: string
}

export const Text = ({ size, label }: TextProps) => (
    <TextPrimitive
        size={size}
    >
        {label}
    </TextPrimitive>
);
