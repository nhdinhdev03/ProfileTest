import React from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import PropTypes from 'prop-types'
import './ThemeToggle.scss'

function ThemeToggle({ theme, toggleTheme, placement = 'floating' }) {
  return (
    <motion.button
      className={`theme-toggle ${placement === 'header' ? 'theme-toggle--header' : ''} ${placement === 'mobile' ? 'theme-toggle--mobile' : ''}`}
      onClick={toggleTheme}
      whileHover={{ scale: placement === 'mobile' ? 1.02 : 1.05 }}
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
      {placement !== 'mobile' && (
        <span className="theme-toggle__label">
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </motion.button>
  )
}

export default ThemeToggle

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  placement: PropTypes.oneOf(['floating', 'header', 'mobile']),
}
