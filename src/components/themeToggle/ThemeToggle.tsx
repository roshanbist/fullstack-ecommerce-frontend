import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../contextAPI/ColorThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  console.log('theme color', theme);

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === 'light' ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
