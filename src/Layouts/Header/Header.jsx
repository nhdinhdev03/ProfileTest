import React, { useState, useEffect, useRef, useCallback, memo } from "react";
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
  FiStar,
} from "react-icons/fi";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import "./Header.scss";



// Extract nav items outside component to avoid recreation on each render
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: FiHome, path: ROUTES.HOME },
  { id: "about", label: "About", icon: FiUser, path: ROUTES.ABOUT },
  { id: "skills", label: "Skills", icon: FiCode, path: ROUTES.SKILLS },
  { id: "projects", label: "Projects", icon: FiFolder, path: ROUTES.PROJECTS },
  { id: "blog", label: "Blog", icon: FiBookOpen, path: ROUTES.BLOG },
  { id: "contact", label: "Contact", icon: FiMail, path: ROUTES.CONTACT },
];

// Helper utilities (outside component to lower cognitive complexity inside component)
const getHeaderOffset = () => {
  const headerEl = document.querySelector('.header');
  return headerEl ? headerEl.getBoundingClientRect().height : 80;
};

const areSectionsClose = (sectionId1, sectionId2) => {
  if (!sectionId1 || !sectionId2) return false;
  const el1 = document.getElementById(sectionId1);
  const el2 = document.getElementById(sectionId2);
  if (!el1 || !el2) return false;
  const gap = Math.abs(el1.getBoundingClientRect().bottom - el2.getBoundingClientRect().top);
  return gap < 200; // threshold
};

const easeInOutQuart = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

const computeTargetY = ({ elementRect, elementTop, headerOffset, isAdjacentNavigation, isCloseSection }) => {
  let targetY;
  const baseHeight = elementRect.height;
  if (isAdjacentNavigation || isCloseSection) {
    const buffer = Math.min(15, baseHeight * 0.03);
    targetY = Math.max(0, elementTop - headerOffset - buffer);
  } else {
    const buffer = Math.min(30, baseHeight * 0.08);
    targetY = Math.max(0, elementTop - headerOffset - buffer);
  }
  return targetY;
};

const computeScrollDuration = ({ distance, isAdjacentNavigation }) => {
  let baseDuration;
  if (isAdjacentNavigation && distance < window.innerHeight * 0.8) {
    baseDuration = Math.min(distance / 4, 600);
  } else if (distance < window.innerHeight) {
    baseDuration = Math.min(distance / 2.5, 800);
  } else {
    baseDuration = Math.min(distance / 2, 1200);
  }
  return Math.max(250, baseDuration);
};

// Memoized Desktop Navigation - Simplified and Modern
const DesktopNav = memo(({ activeSection }) => (
  <nav className="header__nav header__nav--desktop" aria-label="Primary">
    <ul className="header__nav-list">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <li key={item.id} className="header__nav-item">
            <Link
              to={item.path}
              className={`header__nav-link ${isActive ? "header__nav-link--active" : ""}`}
              aria-label={`Navigate to ${item.label}`}
            >
              <Icon className="header__nav-icon" />
              <span className="header__nav-text">{item.label}</span>
              {isActive && (
                <motion.div
                  className="header__nav-indicator"
                  layoutId="activeIndicator"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
));

// Modern Mobile Navigation with smooth animations
const MobileNav = memo(({ isMenuOpen, setIsMenuOpen, activeSection, theme, toggleTheme, mobileNavRef }) => (
  <AnimatePresence mode="wait">
    {isMenuOpen && (
      <>
        <motion.div
          className="header__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => setIsMenuOpen(false)}
        />
        <motion.nav
          id="mobile-navigation"
          className="header__nav header__nav--mobile"
          aria-label="Mobile navigation"
          ref={mobileNavRef}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 40,
              mass: 1
            }
          }}
          exit={{ 
            x: "100%", 
            opacity: 0,
            transition: {
              duration: 0.25,
              ease: "easeIn"
            }
          }}
        >
          <motion.div 
            className="header__nav-mobile-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h2 className="header__nav-mobile-title">Navigation</h2>
            <p className="header__nav-mobile-subtitle">Choose your destination</p>
          </motion.div>
          
          <ul className="header__nav-list header__nav-list--mobile">
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.li 
                  key={item.id} 
                  className="header__nav-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 + (index * 0.05),
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    to={item.path}
                    className={`header__nav-link ${isActive ? "header__nav-link--active" : ""}`}
                    onClick={() => {
                      // Add haptic feedback for mobile
                      if (navigator.vibrate) {
                        navigator.vibrate(10);
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="header__nav-icon-wrapper">
                      <Icon className="header__nav-icon" />
                    </div>
                    <span className="header__nav-text">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="header__nav-active-dot"
                        layoutId="activeDotMobile"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
            
            <motion.li 
              className="header__nav-item header__nav-item--theme"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.1 + (NAV_ITEMS.length * 0.05),
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <button
                className="header__mobile-theme-btn"
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(10);
                  }
                  toggleTheme();
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                <div className="header__theme-icon-wrapper">
                  <motion.div
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {theme === 'dark' ? <FiMoon /> : <FiSun />}
                  </motion.div>
                </div>
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </button>
            </motion.li>
          </ul>
        </motion.nav>
      </>
    )}
  </AnimatePresence>
));

DesktopNav.propTypes = {
  activeSection: PropTypes.string.isRequired,
};

MobileNav.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  mobileNavRef: PropTypes.object.isRequired,
};

// Hook: derive active section from route changes
const useRouteActiveSection = (pathname, getActiveSectionFromPath, setIsMenuOpen) => {
  const [activeSection, setActiveSection] = useState(getActiveSectionFromPath(pathname));
  useEffect(() => {
    setActiveSection(getActiveSectionFromPath(pathname));
    setIsMenuOpen(false); // close menu on navigation
  }, [pathname, getActiveSectionFromPath, setIsMenuOpen]);
  return [activeSection, setActiveSection];
};

// Hook: scroll spy & header scrolled state
const useScrollSpy = (isScrolling, setIsScrolled, setActiveSection) => {
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const handleSectionInView = () => {
      if (isScrolling) return; // skip while programmatic scroll
      let current = 'home';
      const viewHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const headerOffset = getHeaderOffset();
      let maxVisibleArea = 0;
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;
        const viewTop = scrollY + headerOffset;
        const viewBottom = scrollY + viewHeight;
        const visibleTop = Math.max(elementTop, viewTop);
        const visibleBottom = Math.min(elementBottom, viewBottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
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

    let scrollTimeout;
    const throttled = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        handleSectionInView();
        scrollTimeout = null;
      }, 16);
    };

    window.addEventListener('scroll', throttled, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttled);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isScrolling, setIsScrolled, setActiveSection]);
};

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const mobileNavRef = useRef(null);
  const menuButtonRef = useRef(null);
  
  // React Router location hook
  const location = useLocation();
  const pathname = location.pathname;
  
  // Determine active section based on current route
  const getActiveSectionFromPath = useCallback((path) => {
    if (path === ROUTES.HOME) return "home";
    if (path === ROUTES.ABOUT) return "about";
    if (path === ROUTES.SKILLS) return "skills";
    if (path === ROUTES.PROJECTS) return "projects";
    if (path === ROUTES.BLOG || path.includes('/blog/')) return "blog";
    if (path === ROUTES.CONTACT) return "contact";
    return "home";
  }, []);
  
  const [activeSection, setActiveSection] = useRouteActiveSection(pathname, getActiveSectionFromPath, setIsMenuOpen);

  // Helper function to get adjacent sections
  const getAdjacentSections = (currentSectionId) => {
    const currentIndex = NAV_ITEMS.findIndex(item => item.id === currentSectionId);
    return {
      previous: currentIndex > 0 ? NAV_ITEMS[currentIndex - 1].id : null,
      next: currentIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIndex + 1].id : null
    };
  };

  // Scroll spy
  useScrollSpy(isScrolling, setIsScrolled, setActiveSection);
  
  // (Removed inline scroll spy effect - replaced by custom hook)

  const scrollToSection = useCallback((sectionId) => {
    // Update active immediately for responsive UI
    setActiveSection(sectionId);
    setIsScrolling(true);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = getHeaderOffset();
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;
      const { previous, next } = getAdjacentSections(activeSection);
      const isAdjacentNavigation = sectionId === previous || sectionId === next;
      const isCloseSection = areSectionsClose(activeSection, sectionId);
      const targetY = computeTargetY({ elementRect, elementTop, headerOffset, isAdjacentNavigation, isCloseSection });

      const startY = window.scrollY;
      const finalDistance = targetY - startY;
      const distance = Math.abs(finalDistance);
      const duration = computeScrollDuration({ distance, isAdjacentNavigation });
      let startTime = null;

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
  }, [activeSection, setActiveSection, setIsScrolling]);

  // Body scroll lock when menu open (mobile)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  // ESC close & focus trap
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (e.key === 'Tab') {
        const focusable = mobileNavRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Focus first link after animation
    setTimeout(() => {
      mobileNavRef.current?.querySelector('a')?.focus();
    }, 120);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`header ${isScrolled ? "header--scrolled" : ""} ${isMenuOpen ? "header--menu-open" : ""} ${isScrolling ? "header--scrolling" : ""}`}
    >
      <div className="header__container">

        <Link 
          to={ROUTES.HOME}
          className="header__logo-link"
          aria-label="Navigate to Home"
          onClick={() => scrollToSection("home")}
        >
          <div className="header__logo">
            <div className="header__logo-icon">
            <img
              width={50}
              height={50}
              loading="lazy"
              decoding="async"
              src={theme === 'dark' ? img.Logo2 : img.Logo}
              alt="Nhdinh Portfolio Logo"
            />
          </div>
            <div className="header__logo-text">
              <span className="header__logo-name">Nhdinh</span>
              <span className="header__logo-title">Web Developer</span>
            </div>
          </div>
        </Link>

        <DesktopNav activeSection={activeSection} />

        <div className="header__actions">
          <button
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <FiMoon /> : <FiSun />}
          </button>

          <button
            className={`header__menu-toggle ${isMenuOpen ? "header__menu-toggle--open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            ref={menuButtonRef}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      <MobileNav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileNavRef={mobileNavRef}
      />
    </header>
  );
};

export default Header;

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
