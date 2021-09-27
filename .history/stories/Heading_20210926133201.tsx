import React from 'react';

import { Heading as HeadingPrimitive } from '../primitives/Heading';
import './heading.css';

interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({ size }: HeaderProps) => (
    <HeadingPrimitive
        size={size}
    />
);
