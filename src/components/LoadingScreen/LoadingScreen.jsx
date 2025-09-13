import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ 
  isLoading = true, 
  progress = 0, 
  currentTask = "Initializing...",
  onComplete = () => {},
  loadingData = {} 
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation to avoid jarring jumps
  useEffect(() => {
    const targetProgress = Math.min(Math.max(progress, 0), 100);
    
    if (targetProgress > displayProgress) {
      const increment = Math.max((targetProgress - displayProgress) / 10, 1);
      const timer = setTimeout(() => {
        setDisplayProgress(prev => {
          const next = prev + increment;
          return next > targetProgress ? targetProgress : next;
        });
      }, 50);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(targetProgress);
    }
  }, [progress, displayProgress]);

  // Call onComplete when loading is finished
  useEffect(() => {
    if (!isLoading && displayProgress >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // Small delay for visual completion
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, displayProgress, onComplete]);

  // Dynamic loading stages based on progress
  const getLoadingStage = (progressValue) => {
    if (progressValue < 20) return "Initializing...";
    if (progressValue < 40) return "Loading Components...";
    if (progressValue < 60) return "Fetching Data...";
    if (progressValue < 80) return "Preparing Interface...";
    if (progressValue < 95) return "Optimizing Performance...";
    return "Almost Ready...";
  };

  // Use provided currentTask or fallback to progress-based stage
  const displayText = currentTask || getLoadingStage(displayProgress);

  if (!isLoading && displayProgress >= 100) {
    return null; // Hide loading screen when complete
  }

  return (
    <div className="loading-screen">
      {/* Background Effects */}
      <div className="loading-bg-effects">
        <div className="gradient-mesh"></div>
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100],
                x: [0, (Math.random() - 0.5) * 60]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Loader */}
      <motion.div
        className="loader-orbital-3d"
        initial={{ opacity: 0, scale: 0.95, rotateX: -15 }}
        animate={{ 
          opacity: 1, 
          scale: [0.95, 1.02, 0.95],
          rotateX: [-15, 0, -15]
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg
          className="pro-loader"
          viewBox="0 0 300 300"
          width="220"
          height="220"
          aria-labelledby="loaderTitle"
        >
          <title id="loaderTitle">Professional Loading Animation</title>
          <defs>
            {/* Enhanced Gradients */}
            <linearGradient id="ringA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee">
                <animate attributeName="stop-color" 
                  values="#22d3ee;#6366f1;#8b5cf6;#22d3ee" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#a78bfa">
                <animate attributeName="stop-color" 
                  values="#a78bfa;#10b981;#f59e0b;#a78bfa" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#6366f1">
                <animate attributeName="stop-color" 
                  values="#6366f1;#ef4444;#22d3ee;#6366f1" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            
            <linearGradient id="ringB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd">
                <animate attributeName="stop-color" 
                  values="#93c5fd;#34d399;#fbbf24;#93c5fd" 
                  dur="3.5s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#67e8f9">
                <animate attributeName="stop-color" 
                  values="#67e8f9;#a78bfa;#6366f1;#67e8f9" 
                  dur="3.5s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1"/>
            </radialGradient>

            {/* Enhanced Filters */}
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
              <feOffset dx="0" dy="8" result="offset"/>
              <feFlood floodColor="#000000" floodOpacity="0.25"/>
              <feComposite in2="offset" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feColorMatrix in="blur" result="bright" type="matrix" 
                values="1 0 1 0 0  0 1 1 0 0  1 0 1 0 0  0 0 0 1 0"/>
              <feMerge>
                <feMergeNode in="bright"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Circle with Breathing Effect */}
          <g transform="translate(150 150)" filter="url(#softShadow)">
            <circle r="125" fill="url(#centerGlow)" opacity="0.3">
              <animate attributeName="r" values="125;135;125" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* Outer Ring - Enhanced */}
          <g transform="translate(150 150)">
            <circle
              r="105"
              fill="none"
              stroke="url(#ringA)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="160 40"
              filter="url(#outerGlow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0;360;720"
                dur="15s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="8;12;8"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Middle Ring - Enhanced */}
          <g transform="translate(150 150)">
            <circle
              r="80"
              fill="none"
              stroke="url(#ringB)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="120 30"
              filter="url(#outerGlow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="360;0;-360"
                dur="10s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="6;10;6"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Inner Ring - Enhanced */}
          <g transform="translate(150 150)">
            <circle
              r="55"
              fill="none"
              stroke="#6366f1"
              strokeOpacity="0.8"
              strokeWidth="4"
              strokeDasharray="25 15"
              filter="url(#innerGlow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;80;0"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.8;1;0.8"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke"
                values="#6366f1;#22d3ee;#a78bfa;#6366f1"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Center Core - Enhanced */}
          <g transform="translate(150 150)">
            <circle r="12" fill="#ffffff" filter="url(#innerGlow)" opacity="0.9">
              <animate
                attributeName="r"
                values="12;18;12"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill"
                values="#ffffff;#22d3ee;#a78bfa;#ffffff"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Rotating Accent Dots */}
          <g transform="translate(150 150)">
            <g>
              <circle cx="90" cy="0" r="4" fill="#22d3ee" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="-90" cy="0" r="4" fill="#a78bfa" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
              <circle cx="0" cy="90" r="4" fill="#10b981" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" begin="0.25s"/>
              </circle>
              <circle cx="0" cy="-90" r="4" fill="#f59e0b" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" begin="0.75s"/>
              </circle>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0;360"
                dur="8s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="loading-progress"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <motion.span 
          className="progress-percentage"
          key={Math.floor(displayProgress)}
        >
          {Math.floor(displayProgress)}%
        </motion.span>
      </motion.div>

      {/* Loading Text with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayText}
          className="loading-text-wrapper"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.p
            className="loading-text"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(99, 102, 241, 0.5)",
                "0 0 20px rgba(167, 139, 250, 0.7)",
                "0 0 10px rgba(99, 102, 241, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {displayText}
          </motion.p>
          <div className="loading-dots">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >.</motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
