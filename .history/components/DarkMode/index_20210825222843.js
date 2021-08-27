import React from 'react';

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const darkModeAtom = atomWithStorage('darkMode', false);
const colorAtom = atomWithStorage('color', 'gray');


const DarkToggle = () => {
  const { colorMode, setColorMode } = useAtom(darkModeAtom);

  if (!colorMode) {
    return null;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={colorMode === 'dark'}
        onChange={ev => {
          setColorMode(ev.target.checked ? 'dark' : 'light');
        }}
      />{' '}
      Dark
    </label>
  );
};

export default DarkToggle;