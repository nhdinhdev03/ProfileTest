import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  motion,
  useScroll,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import "./Layout.scss";

function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const layoutRef = useRef(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.8]);

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show/hide scroll to top button with enhanced logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollProgress = useTransform(
    scrollY,
    [0, document.body.scrollHeight - window.innerHeight],
    [0, 1]
  );

  return (
    <>
      {/* Ultra Modern Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loading-content">
              <motion.div
                className="loading-logo"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⚡
              </motion.div>
              <motion.div
                className="loading-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading Experience...
              </motion.div>
              <div className="loading-bar">
                <motion.div
                  className="loading-progress"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="app-layout"
        ref={layoutRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ultra Modern Interactive Background */}
        <motion.div className="layout-background" style={{ y: backgroundY }}>
          <div className="bg-grid" />

          {/* Interactive Gradient Orbs */}
          <motion.div
            className="bg-gradient-orb bg-gradient-orb--primary"
            animate={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.3,
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <motion.div
            className="bg-gradient-orb bg-gradient-orb--secondary"
            animate={{
              x: -mousePosition.x * 0.3,
              y: -mousePosition.y * 0.4,
              scale: [1, 0.9, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 40, damping: 25 },
              y: { type: "spring", stiffness: 40, damping: 25 },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <motion.div
            className="bg-gradient-orb bg-gradient-orb--tertiary"
            animate={{
              x: mousePosition.x * 0.2,
              y: mousePosition.y * 0.5,
              rotate: [0, 360],
            }}
            transition={{
              x: { type: "spring", stiffness: 30, damping: 30 },
              y: { type: "spring", stiffness: 30, damping: 30 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />

          <div className="bg-noise" />

          {/* Floating Geometric Shapes */}
          <div className="floating-shapes">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`floating-shape shape-${i + 1}`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Glassmorphism Header */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="header-wrapper"
        >
          <Header />
        </motion.div>

        {/* Enhanced Main Content */}
        <motion.main
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.main>

        <Footer />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Ultra Modern Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 100 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.span
                className="arrow"
                animate={{ y: [-2, 2, -2] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ↑
              </motion.span>
              <div className="scroll-progress-ring">
                <motion.svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  className="progress-ring"
                >
                  <motion.circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="rgba(59, 130, 246, 1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ pathLength: scrollProgress }}
                    initial={{ pathLength: 0 }}
                  />
                </motion.svg>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="scroll-indicator-container"
          initial={{ opacity: 1 }}
          animate={{ opacity: scrollY > 100 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="scroll-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
