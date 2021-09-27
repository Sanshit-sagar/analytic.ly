import { Text as TextPrimitive } from '../primitives/Text';
import './heading.css';

interface TextProps {
    size: '1' | '2' | '3' | '4'
    label: string
}

export const Heading = ({ size, label }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    >
        {label}
    </HeadingPrimitive>
);
