import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <motion.div
        className="loader-orbital-3d"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: [0.98, 1, 0.98] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="pro-loader"
          viewBox="0 0 300 300"
          width="220"
          height="220"
          aria-labelledby="loaderTitle"
        >
          <title id="loaderTitle">Loading animation</title>
          <defs>
            <linearGradient id="ringA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="ringB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="15"
                stdDeviation="12"
                floodColor="#000000"
                floodOpacity="0.35"
              />
            </filter>
            <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          <g transform="translate(150 150)" filter="url(#softShadow)">
            <ellipse
              rx="110"
              ry="68"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          </g>

          <g transform="translate(150 150) rotate(-16)">
            <circle
              r="100"
              fill="none"
              stroke="url(#ringA)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="140 40"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g transform="translate(150 150) rotate(10)">
            <circle
              r="78"
              fill="none"
              stroke="url(#ringB)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="100 30"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g transform="translate(150 150)">
            <circle
              r="55"
              fill="none"
              stroke="#6366f1"
              strokeOpacity="0.6"
              strokeWidth="4"
              strokeDasharray="18 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;60;0"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g transform="translate(150 150)">
            <circle r="10" fill="#a78bfa" filter="url(#innerGlow)">
              <animate
                attributeName="r"
                values="8;12;8"
                dur="2.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill"
                values="#a78bfa;#22d3ee;#a78bfa"
                dur="4.4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading Portfolio...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
