import { Heading as HeadingPrimitive } from '../primitives/Heading';
import './heading.css';

interface HeaderProps {
    size: number; 
}

export const Header = ({ size }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    />
);
