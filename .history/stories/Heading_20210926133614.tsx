import { Heading as HeadingPrimitive } from '../primitives/Heading';
import './heading.css';

interface HeaderProps {
    size: '1'; 
}

export const Header = ({ size }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    />
);
