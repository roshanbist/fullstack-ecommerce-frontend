import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../contextAPI/ColorThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  console.log('theme color', theme);

  return (
    <>
      <button
        onClick={toggleTheme}
        className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-palette-primary border-[2px] border-blue-400 text-blue-400'
      >
        {theme === 'light' ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
