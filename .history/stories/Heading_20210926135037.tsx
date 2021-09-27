import { Heading as HeadingPrimitive } from '../primitives/Heading';
import './heading.css';

interface HeaderProps {
    size: '1' | '2' | '3' | '4'
    label: string
    color: '' 
}

export const Heading = ({ size, label, color }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    />
);
