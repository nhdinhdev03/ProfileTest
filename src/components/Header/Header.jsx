import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiBookOpen,
  FiMail,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import "./Header.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  // Get the current header height (includes safe-area padding) for precise offsets
  const getHeaderOffset = () => {
    const headerEl = document.querySelector(".header");
    if (!headerEl) return 80; // sensible fallback
    return headerEl.getBoundingClientRect().height;
  };

  const navItems = [
    { id: "home", label: "Home", icon: FiHome },
    { id: "about", label: "About", icon: FiUser },
    { id: "skills", label: "Skills", icon: FiCode },
    { id: "projects", label: "Projects", icon: FiFolder },
    { id: "blog", label: "Blog", icon: FiBookOpen },
    { id: "contact", label: "Contact", icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

  const handleSectionInView = () => {
      let current = "home";
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
    const top = el.offsetTop - getHeaderOffset() - 2;
        const bottom = top + el.offsetHeight;
        const y = window.scrollY;
        if (y >= top && y < bottom) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionInView);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionInView);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    // Update active immediately for responsive UI
    setActiveSection(sectionId);
    setIsScrolling(true);

    const element = document.getElementById(sectionId);
    if (element) {
      // Account for fixed header height (dynamic, includes safe-area)
      const headerOffset = getHeaderOffset();
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetY = Math.max(0, elementTop - headerOffset);
      
      // Enhanced smooth scrolling with custom easing for better UX
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second, adaptive duration
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
        }
      };

      // Fallback to native smooth scroll for browsers that support it well
      if ('scrollBehavior' in document.documentElement.style && Math.abs(distance) < 2000) {
        window.scrollTo({ top: targetY, behavior: "smooth" });
        // Set a timeout to reset scrolling state since we can't track native smooth scroll
        setTimeout(() => setIsScrolling(false), duration);
      } else {
        requestAnimationFrame(animateScroll);
      }
    }
    setIsMenuOpen(false);
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.header
      className={`header ${isScrolled ? "header--scrolled" : ""} ${isMenuOpen ? "header--menu-open" : ""}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
  <div className="header__container">
        {/* Mobile Menu Title - only visible when menu is open */}
        <motion.div
          className="header__mobile-title"
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            x: isMenuOpen ? 0 : -30,
            scale: isMenuOpen ? 1 : 0.9
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut",
            delay: isMenuOpen ? 0.1 : 0
          }}
        >
          <span>Menu</span>
        </motion.div>

        <motion.div
          className="header__logo"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.96,
            transition: { duration: 0.1, ease: "easeInOut" }
          }}
          onClick={() => {
            // Add haptic feedback for mobile devices
            if (navigator.vibrate) {
              navigator.vibrate(50);
            }
            scrollToSection("home");
          }}
          animate={{ 
            opacity: isMenuOpen ? 0 : 1,
            x: isMenuOpen ? -30 : 0,
            scale: isMenuOpen ? 0.9 : 1
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut" 
          }}
        >
          <motion.div
            className="header__logo-container"
            whileHover={{ 
              rotate: 5,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ 
              rotate: -2,
              transition: { duration: 0.1 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="header__logo-gradient">
              <motion.div
                className="header__logo-icon"
                animate={isScrolling ? {
                  rotate: [0, 360],
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                    "0 0 40px rgba(139, 92, 246, 0.7)",
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                  ],
                } : {
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.3)",
                    "0 0 30px rgba(139, 92, 246, 0.4)",
                    "0 0 20px rgba(99, 102, 241, 0.3)",
                  ],
                }}
                transition={isScrolling ? {
                  rotate: { duration: 0.8, ease: "easeInOut" },
                  boxShadow: { duration: 0.4, repeat: 2, ease: "easeInOut" }
                } : {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>HD</span>
              </motion.div>
            </div>
          </motion.div>
          <div className="header__logo-text">
            <motion.span
              className="header__logo-name"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hoang Dinh
            </motion.span>
            <motion.span
              className="header__logo-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer
            </motion.span>
          </div>
        </motion.div>

  <nav className="header__nav header__nav--desktop">
          <motion.ul
            className="header__nav-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.id}
                  className="header__nav-item"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileHover={{ y: -2 }}
                >
                  <motion.button
                    className={`header__nav-link ${
                      activeSection === item.id
                        ? "header__nav-link--active"
                        : ""
                    }`}
                    onClick={() => scrollToSection(item.id)}
                    aria-label={`Navigate to ${item.label}`}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(99, 102, 241, 0.08)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <motion.div
                      className="header__nav-icon-container"
                      whileHover={{ rotate: 3, scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                      }}
                    >
                      <Icon className="header__nav-icon" />
                    </motion.div>
                    <span className="header__nav-text">{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        className="header__nav-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <motion.div
                      className="header__nav-glow"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        {/* Theme toggle for desktop - compact version */}
        <div className="header__actions">
          <motion.button
            className="header__theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {theme === 'dark' ? <FiMoon /> : <FiSun />}
            </motion.div>
          </motion.button>
        </div>

  <motion.button
          className={`header__menu-toggle ${
            isMenuOpen ? "header__menu-toggle--open" : ""
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            <motion.div
              className="header__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              className="header__nav header__nav--mobile"
              initial={{ x: "100%", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              exit={{
                x: "100%",
                opacity: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                className="header__nav-mobile-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="header__nav-mobile-title">Navigation</div>
                <div className="header__nav-mobile-subtitle">
                  Choose your destination
                </div>
              </motion.div>

              <ul className="header__nav-list header__nav-list--mobile">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.id}
                      className="header__nav-item"
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.1 + 0.2,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        },
                      }}
                      whileHover={{
                        scale: 1.02,
                        x: 10,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.button
                        className={`header__nav-link ${
                          activeSection === item.id
                            ? "header__nav-link--active"
                            : ""
                        }`}
                        onClick={() => scrollToSection(item.id)}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="header__nav-icon-container"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          <Icon className="header__nav-icon" />
                        </motion.div>
                        <span className="header__nav-text">{item.label}</span>
                        {activeSection === item.id && (
                          <motion.div
                            className="header__nav-active-dot"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            layoutId="activeDotMobile"
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  );
                })}

                {/* Theme Toggle in Mobile Menu */}
                <motion.li
                  className="header__nav-item header__nav-item--theme"
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      delay: navItems.length * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    },
                  }}
                >
                  <div className="header__mobile-theme-toggle">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} placement="mobile" />
                  </div>
                </motion.li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
