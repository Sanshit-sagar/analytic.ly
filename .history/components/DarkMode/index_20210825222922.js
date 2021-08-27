import React from 'react';

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const darkModeAtom = atomWithStorage('darkMode', false);
// const colorAtom = atomWithStorage('color', 'gray');


const DarkToggle = () => {
  const { darkMode, setDarkMode } = useAtom(darkModeAtom)

  if (!darkMode) {
    return null;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={darkMode === 'dark'}
        onChange={ev => {
          setColorMode(event.target.checked ? 'dark' : 'light');
        }}
      />{' '}
      Dark
    </label>
  );
};

export default DarkToggle;