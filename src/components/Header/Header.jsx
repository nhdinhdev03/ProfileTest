import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiBriefcase, FiFolder, FiMail } from 'react-icons/fi'
import './Header.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'skills', label: 'Skills', icon: FiCode },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'projects', label: 'Projects', icon: FiFolder },
    { id: 'contact', label: 'Contact', icon: FiMail }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleSectionInView = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleSectionInView)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionInView)
    }
  }, [navItems])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }

  return (
    <motion.header 
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="header__container">
        <motion.div 
          className="header__logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="header__logo-text">Portfolio</span>
          <span className="header__logo-dot">.</span>
        </motion.div>

        <nav className="header__nav header__nav--desktop">
          <ul className="header__nav-list">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.li 
                  key={item.id}
                  className="header__nav-item"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className={`header__nav-link ${activeSection === item.id ? 'header__nav-link--active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon className="header__nav-icon" />
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        className="header__nav-indicator"
                        layoutId="activeIndicator"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </button>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        <button
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="header__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              className="header__nav header__nav--mobile"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ul className="header__nav-list header__nav-list--mobile">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.li
                      key={item.id}
                      className="header__nav-item"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className={`header__nav-link ${activeSection === item.id ? 'header__nav-link--active' : ''}`}
                        onClick={() => scrollToSection(item.id)}
                      >
                        <Icon className="header__nav-icon" />
                        <span>{item.label}</span>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
