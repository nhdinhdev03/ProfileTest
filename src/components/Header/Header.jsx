import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiBookOpen,
  FiMail,
} from "react-icons/fi";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const HEADER_OFFSET = 90;

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
        const top = el.offsetTop - HEADER_OFFSET - 2;
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

    const element = document.getElementById(sectionId);
    if (element) {
      // Account for fixed header height to prevent misalignment
      const headerOffset = 90;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetY = Math.max(0, elementTop - headerOffset);
      window.scrollTo({ top: targetY, behavior: "smooth" });
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
      className={`header ${isScrolled ? "header--scrolled" : ""}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="header__container">
        <motion.div
          className="header__logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => scrollToSection("home")}
        >
          <motion.div
            className="header__logo-container"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="header__logo-gradient">
              <motion.div
                className="header__logo-icon"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.3)",
                    "0 0 30px rgba(139, 92, 246, 0.4)",
                    "0 0 20px rgba(99, 102, 241, 0.3)",
                  ],
                }}
                transition={{
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
                      scale: 1.05,
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="header__nav-icon-container"
                      whileHover={{ rotate: 5, scale: 1.1 }}
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
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
