import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  text = '',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg',
    xl: 'spinner-xl'
  };

  const colorClasses = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    success: 'spinner-success',
    warning: 'spinner-warning',
    danger: 'spinner-danger'
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <div className={`spinner-container ${sizeClasses[size]} ${colorClasses[color]}`}>
        {/* Outer Ring */}
        <motion.div
          className="spinner-ring spinner-outer"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Middle Ring */}
        <motion.div
          className="spinner-ring spinner-middle"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="spinner-ring spinner-inner"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center Dot */}
        <motion.div
          className="spinner-dot"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Orbiting Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`particle particle-${i + 1}`}
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              rotate: {
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              },
              opacity: {
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>
      
      {text && (
        <motion.p
          className="spinner-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
