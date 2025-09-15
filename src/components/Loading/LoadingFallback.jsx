import React, { memo, useEffect, useState, useRef } from "react";
import "./LoadingFallback.scss";

/**
 * ✨ ULTRA FUTURISTIC LoadingFallback 1000x 
 * 
 * Revolutionary Features:
 * - Neomorphism 3D design with depth
 * - AI-inspired particle system 
 * - Morphing geometric animations
 * - Dynamic color pulse system
 * - Quantum loading physics
 * - Neural network visual effects
 * - Holographic glassmorphism
 * - Fluid responsive typography
 */
const LoadingFallback = memo(() => {
  const [particles, setParticles] = useState([]);
  const [colorPhase, setColorPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  
  // Generate AI particles and ensure visibility
  useEffect(() => {
    // Force component to be visible immediately
    setIsVisible(true);
    
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        direction: Math.random() * 360,
        opacity: Math.random() * 0.7 + 0.3,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
    const interval = setInterval(() => {
      setColorPhase(prev => (prev + 1) % 360);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Dynamic color generator
  const getDynamicColor = (offset = 0) => {
    return `hsl(${(colorPhase + offset) % 360}, 80%, 60%)`;
  };

  // Force render để debug
  console.log("🚀 LoadingFallback is rendering!", { isVisible, particles: particles.length });

  if (!isVisible) {
    return <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      background: 'rgba(0,0,0,0.9)', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 10000
    }}>
      Simple Loading...
    </div>;
  }

  return (
    <div 
      className="loading-fallback-ultra"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)
        `,
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        zIndex: 10000,
        overflow: 'hidden',
        animation: 'cosmicEntrance 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform, opacity',
        contain: 'layout style paint'
      }}
      role="status"
      aria-label="Loading with advanced animations"
      aria-live="polite"
    >
      {/* AI Particle System Background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
              opacity: particle.opacity,
              animation: `
                particleFloat 8s ease-in-out infinite,
                particlePulse 3s ease-in-out infinite
              `,
              animationDelay: `${particle.id * 0.1}s`,
              filter: 'blur(0.5px)',
              transform: `rotate(${particle.direction}deg)`
            }}
          />
        ))}
      </div>

      {/* Neural Network Grid Background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'neuralGrid 20s linear infinite',
          opacity: 0.4
        }}
      />

      {/* Main Holographic Container */}
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          padding: '4rem 5rem',
          borderRadius: '32px',
          background: `
            linear-gradient(145deg, 
              rgba(255,255,255,0.1) 0%, 
              rgba(255,255,255,0.05) 25%,
              rgba(0,0,0,0.1) 75%,
              rgba(0,0,0,0.2) 100%
            )
          `,
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: `
            0 50px 100px -20px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 2px 0 rgba(255, 255, 255, 0.2),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1),
            0 0 50px rgba(120, 119, 198, 0.3)
          `,
          backdropFilter: 'blur(30px) contrast(120%)',
          WebkitBackdropFilter: 'blur(30px) contrast(120%)',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
          animation: 'holographicFloat 6s ease-in-out infinite',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, filter'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(-5deg) rotateY(5deg) scale(1.03)';
          e.currentTarget.style.filter = 'brightness(1.2) contrast(1.3)';
          e.currentTarget.style.boxShadow = `
            0 60px 120px -20px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 2px 0 rgba(255, 255, 255, 0.3),
            0 0 80px ${getDynamicColor()}
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
          e.currentTarget.style.filter = 'brightness(1) contrast(1)';
          e.currentTarget.style.boxShadow = `
            0 50px 100px -20px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 2px 0 rgba(255, 255, 255, 0.2),
            0 0 50px rgba(120, 119, 198, 0.3)
          `;
        }}
      >
        {/* Quantum Spinner System */}
        <div 
          style={{ 
            position: 'relative', 
            width: '120px', 
            height: '120px',
            filter: 'drop-shadow(0 0 20px rgba(120, 119, 198, 0.6))'
          }}
        >
          {/* Quantum Field Ring */}
          <div 
            style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundImage: `conic-gradient(from 0deg, 
                ${getDynamicColor(0)} 0deg,
                ${getDynamicColor(60)} 60deg,
                ${getDynamicColor(120)} 120deg,
                ${getDynamicColor(180)} 180deg,
                ${getDynamicColor(240)} 240deg,
                ${getDynamicColor(300)} 300deg,
                ${getDynamicColor(0)} 360deg
              )`,
              animation: 'quantumSpin 3s linear infinite',
              filter: 'blur(8px)',
              opacity: 0.8
            }}
          />
          
          {/* Neural Ring 1 */}
          <div 
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              top: '10px',
              left: '10px',
              border: `4px solid transparent`,
              borderTop: `4px solid ${getDynamicColor(0)}`,
              borderRight: `4px solid ${getDynamicColor(90)}`,
              borderRadius: '50%',
              animation: 'neuralSpin1 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
              filter: 'drop-shadow(0 0 15px currentColor)'
            }}
          />
          
          {/* Neural Ring 2 */}
          <div 
            style={{
              position: 'absolute',
              width: '70px',
              height: '70px',
              top: '25px',
              left: '25px',
              border: `3px solid transparent`,
              borderLeft: `3px solid ${getDynamicColor(120)}`,
              borderBottom: `3px solid ${getDynamicColor(240)}`,
              borderRadius: '50%',
              animation: 'neuralSpin2 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse',
              filter: 'drop-shadow(0 0 12px currentColor)'
            }}
          />
          
          {/* Neural Ring 3 */}
          <div 
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              top: '40px',
              left: '40px',
              border: `2px solid transparent`,
              borderTop: `2px solid ${getDynamicColor(180)}`,
              borderLeft: `2px solid ${getDynamicColor(270)}`,
              borderRadius: '50%',
              animation: 'neuralSpin3 1s linear infinite',
              filter: 'drop-shadow(0 0 8px currentColor)'
            }}
          />
          
          {/* Quantum Core */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '20px',
              height: '20px',
              backgroundImage: `radial-gradient(circle, 
                ${getDynamicColor()} 0%, 
                ${getDynamicColor(180)} 50%, 
                transparent 100%
              )`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'quantumPulse 2s ease-in-out infinite',
              boxShadow: `
                0 0 20px ${getDynamicColor()},
                0 0 40px ${getDynamicColor(60)},
                0 0 60px ${getDynamicColor(120)}
              `
            }}
          />
          
          {/* Energy Orbs */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                backgroundImage: `radial-gradient(circle, ${getDynamicColor(i * 90)} 0%, transparent 70%)`,
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `
                  translate(-50%, -50%) 
                  rotate(${i * 90 + colorPhase}deg) 
                  translateX(45px) 
                  scale(${1 + Math.sin(Date.now() * 0.01 + i) * 0.5})
                `,
                animation: `energyOrb${i} ${2 + i * 0.5}s ease-in-out infinite`,
                filter: 'blur(1px)',
                opacity: 0.9
              }}
            />
          ))}
        </div>

        {/* Holographic Text Display */}
        <div style={{ textAlign: 'center', position: 'relative' }}>
          {/* Main Loading Text */}
          <div 
            style={{
              backgroundImage: `linear-gradient(135deg, 
                ${getDynamicColor(0)} 0%, 
                ${getDynamicColor(120)} 50%, 
                ${getDynamicColor(240)} 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: '800',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              animation: 'holographicShimmer 3s ease-in-out infinite',
              marginBottom: '0.5rem',
              textShadow: `
                0 0 10px ${getDynamicColor()},
                0 0 20px ${getDynamicColor(60)},
                0 0 30px ${getDynamicColor(120)}
              `
            }}
          >
            QUANTUM LOADING
          </div>
          
          {/* Subtitle */}
          <div 
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '400',
              letterSpacing: '0.05em',
              animation: 'subtleGlow 2s ease-in-out infinite alternate',
              marginBottom: '1rem'
            }}
          >
            Neural networks initializing...
          </div>
          
          {/* Progress Percentage */}
          <div 
            style={{
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              color: getDynamicColor(),
              fontWeight: '600',
              fontFamily: "'SF Mono', 'Monaco', monospace",
              animation: 'dataFlow 1s ease-in-out infinite'
            }}
          >
            {Math.floor((colorPhase / 360) * 100 + Math.random() * 10)}%
          </div>
        </div>

        {/* Neural Progress Indicator */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center',
          position: 'relative'
        }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 'clamp(8px, 1.5vw, 12px)',
                height: 'clamp(8px, 1.5vw, 12px)',
                borderRadius: '50%',
                backgroundImage: `radial-gradient(circle, 
                  ${getDynamicColor(i * 72)} 0%, 
                  ${getDynamicColor(i * 72 + 180)} 100%
                )`,
                animation: `neuralPulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                filter: `drop-shadow(0 0 8px ${getDynamicColor(i * 72)})`,
                transform: `scale(${1 + Math.sin(Date.now() * 0.005 + i) * 0.3})`
              }}
            />
          ))}
        </div>

        {/* Floating Data Points */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            borderRadius: '32px'
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundImage: getDynamicColor(i * 30),
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `dataPoint 4s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                filter: 'blur(0.5px)',
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>

      {/* Ultra Advanced CSS Animations & Effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
      
        `
      }} />
    </div>
  );
});

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;