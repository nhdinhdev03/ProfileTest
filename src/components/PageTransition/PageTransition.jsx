import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = memo(({ children }) => {
  const location = useLocation();

  // Ultra-optimized variants for mobile performance
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 4, // Minimal movement
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2, // Faster transition
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -2, // Minimal movement
      transition: {
        duration: 0.1, // Very fast exit
        ease: "easeIn",
      },
    },
  };

  // Detect mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  // Use simpler animations on mobile
  const mobileVariants = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1, ease: "easeIn" }
    },
  };

  const variants = isMobile ? mobileVariants : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        style={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          // Optimize for performance
          willChange: isMobile ? 'opacity' : 'transform, opacity',
          transform: 'translateZ(0)', // Force hardware acceleration
          // Prevent layout shifts
          contain: 'layout style',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
