import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(systemPrefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.div
      className="theme-toggle-container"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Toggle Track */}
        <motion.div
          className="toggle-track"
          animate={{
            backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Stars for dark mode */}
          <AnimatePresence>
            {isDark && (
              <motion.div
                className="stars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`star star-${i + 1}`}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clouds for light mode */}
          <AnimatePresence>
            {!isDark && (
              <motion.div
                className="clouds"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`cloud cloud-${i + 1}`}
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Thumb */}
          <motion.div
            className="toggle-thumb"
            animate={{
              x: isDark ? 0 : 28,
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              boxShadow: isDark 
                ? '0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(30, 41, 59, 0.8)'
                : '0 0 20px rgba(251, 191, 36, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.8)',
            }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
          >
            {/* Moon (Dark Mode) */}
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  className="moon"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  🌙
                  {/* Moon craters */}
                  <div className="crater crater-1" />
                  <div className="crater crater-2" />
                  <div className="crater crater-3" />
                </motion.div>
              ) : (
                /* Sun (Light Mode) */
                <motion.div
                  key="sun"
                  className="sun"
                  initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    rotate: 0, 
                    scale: 1,
                  }}
                  exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="sun-core"
                    animate={{
                      rotate: 360,
                      boxShadow: [
                        '0 0 20px rgba(251, 191, 36, 0.8)',
                        '0 0 30px rgba(251, 191, 36, 1)',
                        '0 0 20px rgba(251, 191, 36, 0.8)',
                      ],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    ☀️
                  </motion.div>
                  
                  {/* Sun rays */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`sun-ray ray-${i + 1}`}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Hover Glow Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="hover-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Theme Label */}
      <motion.span
        className="theme-label"
        animate={{
          opacity: isHovered ? 1 : 0.7,
          y: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? 'Dark' : 'Light'} Mode
      </motion.span>
    </motion.div>
  );
};

export default ThemeToggle;
