import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('dsa-learn-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('dsa-learn-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('dsa-learn-theme', 'light');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#111827' : '#ffffff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isDark ? '#111827' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      
      // Add smooth transition effect
      document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      
      // Remove transition after animation completes
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
      
      return newTheme;
    });
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('dsa-learn-theme');
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};