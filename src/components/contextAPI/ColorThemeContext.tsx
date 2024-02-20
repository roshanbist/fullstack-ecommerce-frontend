import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('color-theme');

    if (typeof storedTheme === 'string') {
      return storedTheme;
    }
  }
  return 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('color-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedMode = localStorage.getItem('color-theme');
    if (storedMode) {
      setTheme(storedMode);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
