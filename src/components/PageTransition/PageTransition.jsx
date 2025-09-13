import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  // Optimized variants cho page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 8, // Reduced from 20px
      scale: 0.99, // Reduced from 0.98
    },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.25, // Reduced from 0.4s
        ease: [0.23, 1, 0.32, 1], // Custom easing for smoother feel
        staggerChildren: 0.05, // Reduced from 0.1
      },
    },
    exit: {
      opacity: 0,
      y: -4, // Reduced from -10px
      scale: 1.01, // Reduced from 1.02
      transition: {
        duration: 0.15, // Reduced from 0.2s
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // Variants cho content stagger animation
  const contentVariants = {
    initial: {
      opacity: 0,
      y: 8, // Reduced from 15px
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2, // Reduced from 0.3s
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        style={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          // Optimize for performance
          willChange: 'transform, opacity',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      >
        <motion.div 
          variants={contentVariants}
          style={{ 
            width: '100%',
            // Prevent layout shifts
            minHeight: 'inherit'
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
