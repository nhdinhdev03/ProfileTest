import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
import { ROUTES } from "router/routeConstants";
import { useRoutePreloader } from "hooks/useRoutePreloader";
import img from "assets/Img";
import LanguageToggle from "components/LanguageToggle";
import "./Header.scss";

// Hook to generate nav items with translations
const useNavItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: "home",
      label: t("navigation.home"),
      icon: FiHome,
      path: ROUTES.HOME,
    },
    {
      id: "about",
      label: t("navigation.about"),
      icon: FiUser,
      path: ROUTES.ABOUT,
    },
    {
      id: "skills",
      label: t("navigation.skills"),
      icon: FiCode,
      path: ROUTES.SKILLS,
    },
    {
      id: "projects",
      label: t("navigation.projects"),
      icon: FiFolder,
      path: ROUTES.PROJECTS,
    },
    {
      id: "blog",
      label: t("navigation.blog"),
      icon: FiBookOpen,
      path: ROUTES.BLOG,
    },
    {
      id: "contact",
      label: t("navigation.contact"),
      icon: FiMail,
      path: ROUTES.CONTACT,
    },
  ];
};

// Helper utilities (outside component to lower cognitive complexity inside component)
const getHeaderOffset = () => {
  const headerEl = document.querySelector(".header");
  return headerEl ? headerEl.getBoundingClientRect().height : 80;
};

const areSectionsClose = (sectionId1, sectionId2) => {
  if (!sectionId1 || !sectionId2) return false;
  const el1 = document.getElementById(sectionId1);
  const el2 = document.getElementById(sectionId2);
  if (!el1 || !el2) return false;
  const gap = Math.abs(
    el1.getBoundingClientRect().bottom - el2.getBoundingClientRect().top
  );
  return gap < 200; // threshold
};

const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const computeTargetY = ({
  elementRect,
  elementTop,
  headerOffset,
  isAdjacentNavigation,
  isCloseSection,
}) => {
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
const DesktopNav = memo(({ activeSection, onLinkHover, pathname }) => {
  const navItems = useNavItems();

  const handleDesktopLinkClick = useCallback(
    (e, path) => {
      // If already on the same page, prevent default navigation
      if (pathname === path) {
        e.preventDefault();
        if (path === ROUTES.HOME) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      // Otherwise, let React Router handle the navigation
    },
    [pathname]
  );

  return (
    <nav className="header__nav header__nav--desktop" aria-label="Primary">
      <ul className="header__nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="header__nav-item">
              <Link
                to={item.path}
                className={`header__nav-link ${
                  isActive ? "header__nav-link--active" : ""
                }`}
                aria-label={`Navigate to ${item.label}`}
                onMouseEnter={() => onLinkHover?.(item.path)}
                onClick={(e) => handleDesktopLinkClick(e, item.path)}
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
  );
});

// Modern Mobile Navigation with smooth animations
const MobileNav = memo(
  ({
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    setActiveSection,
    theme,
    toggleTheme,
    mobileNavRef,
    pathname,
    navigate,
  }) => {
    const navItems = useNavItems();
    const { t } = useTranslation();

    const handleLinkClick = (e, path) => {
      e.preventDefault();
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      setIsMenuOpen(false);

      // Optimize navigation - don't reload if already on the same page
      if (pathname === path) {
        // If it's home page, scroll to top
        if (path === ROUTES.HOME) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("home");
        }
        return;
      }

      // Use timeout to wait for the menu close animation
      setTimeout(() => {
        navigate(path);
      }, 300);
    };

    return (
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
                  mass: 1,
                },
              }}
              exit={{
                x: "100%",
                opacity: 0,
                transition: {
                  duration: 0.25,
                  ease: "easeIn",
                },
              }}
            >
              <motion.div
                className="header__nav-mobile-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h2 className="header__nav-mobile-title">
                  {t("navigation.menu")}
                </h2>
                <p className="header__nav-mobile-subtitle">
                  {t("navigation.choose_destination")}
                </p>
              </motion.div>

              <ul className="header__nav-list header__nav-list--mobile">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      className="header__nav-item"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        to={item.path}
                        className={`header__nav-link ${
                          isActive ? "header__nav-link--active" : ""
                        }`}
                        onClick={(e) => handleLinkClick(e, item.path)}
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
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
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
                    delay: 0.1 + navItems.length * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <div className="header__mobile-controls">
                    <LanguageToggle 
                      className="header__mobile-language-toggle" 
                      variant="compact"
                    />

                    <button
                      className="header__mobile-theme-btn"
                      onClick={() => {
                        if (navigator.vibrate) {
                          navigator.vibrate(10);
                        }
                        toggleTheme();
                      }}
                      aria-label={`Switch to ${
                        theme === "dark" ? "light" : "dark"
                      } theme`}
                    >
                      <div className="header__theme-icon-wrapper">
                        <motion.div
                          animate={{ rotate: theme === "dark" ? 0 : 180 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {theme === "dark" ? <FiMoon /> : <FiSun />}
                        </motion.div>
                      </div>
                      <span>
                        {theme === "dark"
                          ? t("header.switch_to_light")
                          : t("header.switch_to_dark")}
                      </span>
                    </button>
                  </div>
                </motion.li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    );
  }
);

DesktopNav.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onLinkHover: PropTypes.func,
  pathname: PropTypes.string.isRequired,
};

MobileNav.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  mobileNavRef: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

// Hook: derive active section from route changes
const useRouteActiveSection = (
  pathname,
  getActiveSectionFromPath,
  setIsMenuOpen
) => {
  const [activeSection, setActiveSection] = useState(
    getActiveSectionFromPath(pathname)
  );
  useEffect(() => {
    setActiveSection(getActiveSectionFromPath(pathname));
    setIsMenuOpen(false); // close menu on navigation
  }, [pathname, getActiveSectionFromPath, setIsMenuOpen]);
  return [activeSection, setActiveSection];
};

// Hook: scroll spy & header scrolled state
const useScrollSpy = (
  isScrolling,
  setIsScrolled,
  setActiveSection,
  navItems
) => {
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const handleSectionInView = () => {
      if (isScrolling) return; // skip while programmatic scroll
      let current = "home";
      const viewHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const headerOffset = getHeaderOffset();
      let maxVisibleArea = 0;
      navItems.forEach(({ id }) => {
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
        const topProximityBonus = Math.max(
          0,
          (viewHeight * 0.5 - distanceFromTop) / (viewHeight * 0.5)
        );
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
      }, 32); // Increased from 16ms to 32ms for better performance
    };

    window.addEventListener("scroll", throttled, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttled);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isScrolling, setIsScrolled, setActiveSection, navItems]);
};

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const mobileNavRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { t } = useTranslation();

  // Route preloading hook
  const { preloadRoute } = useRoutePreloader();

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Get nav items for scroll spy
  const navItems = useNavItems();

  // Determine active section based on current route
  const getActiveSectionFromPath = useCallback((path) => {
    if (path === ROUTES.HOME) return "home";
    if (path === ROUTES.ABOUT) return "about";
    if (path === ROUTES.SKILLS) return "skills";
    if (path === ROUTES.PROJECTS) return "projects";
    if (path === ROUTES.BLOG || path.includes("/blog/")) return "blog";
    if (path === ROUTES.CONTACT) return "contact";
    return "home";
  }, []);

  const [activeSection, setActiveSection] = useRouteActiveSection(
    pathname,
    getActiveSectionFromPath,
    setIsMenuOpen
  );

  // Scroll spy
  useScrollSpy(isScrolling, setIsScrolled, setActiveSection, navItems);

  // Handle link hover for preloading
  const handleLinkHover = useCallback(
    (path) => {
      preloadRoute(path);
    },
    [preloadRoute]
  );

  // Optimized logo click handler
  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();

      // If already on home page, just scroll to top
      if (pathname === ROUTES.HOME) {
        // Scroll to top smoothly
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        // Update active section
        setActiveSection("home");
      } else {
        // Navigate to home page
        navigate(ROUTES.HOME);
      }
    },
    [pathname, navigate]
  );

  // (Removed inline scroll spy effect - replaced by custom hook)

  // Body scroll lock when menu open (mobile)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isMenuOpen]);

  // ESC close & focus trap
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (e.key === "Tab") {
        const focusable = mobileNavRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
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
    window.addEventListener("keydown", handleKeyDown);
    // Focus first link after animation
    setTimeout(() => {
      mobileNavRef.current?.querySelector("a")?.focus();
    }, 120);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`header ${isScrolled ? "header--scrolled" : ""} ${
        isMenuOpen ? "header--menu-open" : ""
      } ${isScrolling ? "header--scrolling" : ""}`}
    >
      <div className="header__container">
        <button
          className="header__logo-link"
          aria-label={t("header.logo_aria_label")}
          onClick={handleLogoClick}
        >
          <div className="header__logo">
            <div className="header__logo-icon">
              <img
                width={50}
                height={50}
                decoding="async"
                src={theme === "dark" ? img.Logo2 : img.Logo}
                alt="Nhdinh Portfolio Logo"
              />
            </div>
            <div className="header__logo-text">
              <span className="header__logo-name">
                {t("header.brand_name")}
              </span>
              <span className="header__logo-title">
                {t("header.brand_title")}
              </span>
            </div>
          </div>
        </button>

        <DesktopNav
          activeSection={activeSection}
          onLinkHover={handleLinkHover}
          pathname={pathname}
        />

        <div className="header__actions">
          <LanguageToggle 
            className="header__language-toggle" 
            variant="dropdown" 
          />

          <button
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? t("header.theme_toggle_light")
                : t("header.theme_toggle_dark")
            }
            title={
              theme === "dark"
                ? t("header.theme_toggle_light")
                : t("header.theme_toggle_dark")
            }
          >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>

          <button
            className={`header__menu-toggle ${
              isMenuOpen ? "header__menu-toggle--open" : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("header.menu_toggle")}
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
        setActiveSection={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileNavRef={mobileNavRef}
        pathname={pathname}
        navigate={navigate}
      />
    </header>
  );
}

export default Header;

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
