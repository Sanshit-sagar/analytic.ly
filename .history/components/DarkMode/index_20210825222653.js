import React from 'react';





const DarkToggle = () => {
  const { colorMode, setColorMode } =

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