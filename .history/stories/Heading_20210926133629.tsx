import { Heading as HeadingPrimitive } from '../primitives/Heading';
import './heading.css';

interface HeaderProps {
    size: '1' | '2' | '3' | '4'
     
}

export const Header = ({ size }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    />
);
