import React from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import './ThemeToggle.scss'

const ThemeToggle = ({ theme, toggleTheme, placement = 'floating' }) => {
  return (
    <motion.button
  className={`theme-toggle ${placement === 'header' ? 'theme-toggle--header' : ''}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div className="theme-toggle__track">
        <motion.div
          className="theme-toggle__thumb"
          animate={{
            x: theme === 'dark' ? 0 : 24,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 35
          }}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 360 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <FiMoon /> : <FiSun />}
          </motion.div>
        </motion.div>
      </div>
      <span className="theme-toggle__label">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </motion.button>
  )
}

export default ThemeToggle
