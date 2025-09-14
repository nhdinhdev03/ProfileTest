import { useState, useEffect } from 'react';

export const useTheme = (initialTheme = 'dark') => {
  // Đọc theme từ localStorage ngay lập tức hoặc từ document attribute nếu đã được set bởi inline script
  const getInitialTheme = () => {
    try {
      // Ưu tiên lấy từ document attribute (đã được set bởi inline script)
      const documentTheme = document.documentElement.getAttribute('data-theme');
      if (documentTheme) return documentTheme;
      
      // Fallback sang localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      
      // Cuối cùng mới dùng initialTheme
      return initialTheme;
    } catch (e) {
      console.error('Error reading theme:', e);
      return initialTheme;
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Chỉ đồng bộ lại nếu theme trong state khác với theme trong document
    const currentDocumentTheme = document.documentElement.getAttribute('data-theme');
    if (currentDocumentTheme !== theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return [theme, toggleTheme];
};
