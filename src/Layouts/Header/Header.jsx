import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
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

import { ROUTES } from "../../router/routeConstants";

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // React Router location hook
  const location = useLocation();
  const pathname = location.pathname;
  
  // Determine active section based on current route
  const getActiveSectionFromPath = (path) => {
    if (path === ROUTES.HOME) return "home";
    if (path === ROUTES.ABOUT) return "about";
    if (path === ROUTES.SKILLS) return "skills";
    if (path === ROUTES.PROJECTS) return "projects";
    if (path === ROUTES.BLOG || path.includes('/blog/')) return "blog";
    if (path === ROUTES.CONTACT) return "contact";
    return "home";
  };
  
  const [activeSection, setActiveSection] = useState(getActiveSectionFromPath(pathname));

  // Get the current header height (includes safe-area padding) for precise offsets
  const getHeaderOffset = () => {
    const headerEl = document.querySelector(".header");
    if (!headerEl) return 80; // sensible fallback
    return headerEl.getBoundingClientRect().height;
  };

  // Helper function to get adjacent sections
  const getAdjacentSections = (currentSectionId) => {
    const currentIndex = navItems.findIndex(item => item.id === currentSectionId);
    return {
      previous: currentIndex > 0 ? navItems[currentIndex - 1].id : null,
      next: currentIndex < navItems.length - 1 ? navItems[currentIndex + 1].id : null
    };
  };

  // Check if two sections are close to each other
  const areSectionsClose = (sectionId1, sectionId2) => {
    const el1 = document.getElementById(sectionId1);
    const el2 = document.getElementById(sectionId2);
    if (!el1 || !el2) return false;
    
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const gap = Math.abs(rect1.bottom - rect2.top);
    
    // Consider sections close if gap is less than 200px
    return gap < 200;
  };

  const navItems = [
    { id: "home", label: "Home", icon: FiHome, path: ROUTES.HOME },
    { id: "about", label: "About", icon: FiUser, path: ROUTES.ABOUT },
    { id: "skills", label: "Skills", icon: FiCode, path: ROUTES.SKILLS },
    { id: "projects", label: "Projects", icon: FiFolder, path: ROUTES.PROJECTS },
    { id: "blog", label: "Blog", icon: FiBookOpen, path: ROUTES.BLOG },
    { id: "contact", label: "Contact", icon: FiMail, path: ROUTES.CONTACT },
  ];

  // Update active section when route changes
  useEffect(() => {
    setActiveSection(getActiveSectionFromPath(pathname));
  }, [pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionInView = () => {
      // Don't update active section while programmatically scrolling
      if (isScrolling) return;
      
      let current = "home";
      const viewHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const headerOffset = getHeaderOffset();
      
      // Find the section that's most visible in the viewport
      let maxVisibleArea = 0;
      
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;
        
        // Calculate visible area of this section
        const viewTop = scrollY + headerOffset;
        const viewBottom = scrollY + viewHeight;
        
        const visibleTop = Math.max(elementTop, viewTop);
        const visibleBottom = Math.min(elementBottom, viewBottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
        
        // Give priority to sections that are positioned at the top of viewport
        const distanceFromTop = Math.abs(elementTop - viewTop);
        const topProximityBonus = Math.max(0, (viewHeight * 0.5 - distanceFromTop) / (viewHeight * 0.5));
        const adjustedVisibleArea = visibleArea * (1 + topProximityBonus * 0.3);
        
        if (adjustedVisibleArea > maxVisibleArea) {
          maxVisibleArea = adjustedVisibleArea;
          current = id;
        }
      });
      
      setActiveSection(current);
    };

    // Throttle scroll events for better performance
    let scrollTimeout;
    const throttledHandleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        handleSectionInView();
        scrollTimeout = null;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  const scrollToSection = (sectionId) => {
    // Update active immediately for responsive UI
    setActiveSection(sectionId);
    setIsScrolling(true);

    const element = document.getElementById(sectionId);
    if (element) {
      // Account for fixed header height (dynamic, includes safe-area)
      const headerOffset = getHeaderOffset();
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;
      let targetY = Math.max(0, elementTop - headerOffset);
      
      // Check if we're navigating to adjacent sections
      const { previous, next } = getAdjacentSections(activeSection);
      const isAdjacentNavigation = sectionId === previous || sectionId === next;
      const isCloseSection = areSectionsClose(activeSection, sectionId);
      
      // For close/adjacent sections, optimize positioning
      if (isAdjacentNavigation || isCloseSection) {
        // Add a smaller buffer for adjacent sections
        const buffer = Math.min(15, elementRect.height * 0.03);
        targetY = Math.max(0, elementTop - headerOffset - buffer);
      } else {
        // For distant sections, add more spacing
        const buffer = Math.min(30, elementRect.height * 0.08);
        targetY = Math.max(0, elementTop - headerOffset - buffer);
      }
      
      // Enhanced smooth scrolling with adaptive duration and easing
      const startY = window.scrollY;
      const finalDistance = targetY - startY;
      const distance = Math.abs(finalDistance);
      
      // Adaptive duration based on distance and section relationship
      let baseDuration;
      if (isAdjacentNavigation && distance < window.innerHeight * 0.8) {
        // Faster for nearby adjacent sections
        baseDuration = Math.min(distance / 4, 600);
      } else if (distance < window.innerHeight) {
        // Medium speed for sections within viewport
        baseDuration = Math.min(distance / 2.5, 800);
      } else {
        // Longer duration for distant sections, but not too long
        baseDuration = Math.min(distance / 2, 1200);
      }
      
      const duration = Math.max(250, baseDuration); // Minimum 250ms for smooth feel
      let startTime = null;

      // Enhanced easing function for more natural feel
      const easeInOutQuart = (t) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutQuart(progress);
        
        const currentScrollY = startY + finalDistance * easedProgress;
        window.scrollTo(0, currentScrollY);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
          // Ensure we're exactly at the target position
          window.scrollTo(0, targetY);
        }
      };

      // Always use custom animation for consistent behavior
      requestAnimationFrame(animateScroll);
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
      className={`header ${isScrolled ? "header--scrolled" : ""} ${isMenuOpen ? "header--menu-open" : ""} ${isScrolling ? "header--scrolling" : ""}`}
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

        <Link 
          to={ROUTES.HOME}
          className="header__logo-link"
          aria-label="Navigate to Home"
        >
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
            <div className="header__logo-gradient" >
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
        </Link>

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
                  <Link 
                    to={item.path}
                    className={`header__nav-link ${
                      activeSection === item.id
                        ? "header__nav-link--active"
                        : ""
                    }`}
                    aria-label={`Navigate to ${item.label}`}
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
                  </Link>
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
                      <Link
                        to={item.path}
                        className={`header__nav-link ${
                          activeSection === item.id
                            ? "header__nav-link--active"
                            : ""
                        }`}
                        onClick={() => setIsMenuOpen(false)}
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
                      </Link>
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
