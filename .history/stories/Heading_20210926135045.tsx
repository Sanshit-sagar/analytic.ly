import { Heading as HeadingPrimitive } from '../primitives/Heading';
import './heading.css';

interface HeaderProps {
    size: '1' | '2' | '3' | '4'
    label: string
}

export const Heading = ({ size, label }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    />
);
