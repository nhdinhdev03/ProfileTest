import { useState, useEffect } from 'react';

export const useTheme = (initialTheme = 'dark') => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || initialTheme;
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [initialTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return [theme, toggleTheme];
};
