import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import "./NotFound.scss";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [clickEffect, setClickEffect] = useState([]);

  const createClickEffect = useCallback((e) => {
    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickEffect(prev => [...prev, newEffect]);
  }, []);

  const removeClickEffect = useCallback((effectId) => {
    setClickEffect(prev => prev.filter(effect => effect.id !== effectId));
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleClick = useCallback((e) => {
    createClickEffect(e);
    const effectId = Date.now();
    setTimeout(() => removeClickEffect(effectId), 1000);
  }, [createClickEffect, removeClickEffect]);

  useEffect(() => {
    // Initialize particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
    setIsLoaded(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Animate particles
  useEffect(() => {
    const updateParticlePosition = (particle) => {
      let newX = particle.x + particle.speedX;
      let newY = particle.y + particle.speedY;
      
      // Wrap particles around screen edges
      if (newX > window.innerWidth) newX = 0;
      if (newX < 0) newX = window.innerWidth;
      if (newY > window.innerHeight) newY = 0;
      if (newY < 0) newY = window.innerHeight;
      
      return {
        ...particle,
        x: newX,
        y: newY,
      };
    };

    const animateParticles = () => {
      setParticles(prev => prev.map(updateParticlePosition));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleIconHover = useCallback((e) => {
    // Add sound effect simulation (visual feedback)
    const target = e.target;
    target.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) brightness(1.5)';
    setTimeout(() => {
      target.style.filter = '';
    }, 300);
  }, []);

  return (
    <div className={`not-found-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Click Effects */}
      {clickEffect.map(effect => (
        <div
          key={effect.id}
          className="click-effect"
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="not-found-content">
        {/* Animated 404 */}
        <div className="error-code">
          <span className="digit digit-4-1">4</span>
          <span className="digit digit-0">
            <div className="zero-inner">
              <div className="zero-ring"></div>
            </div>
          </span>
          <span className="digit digit-4-2">4</span>
        </div>

        {/* Glitch Effect Text */}
        <div className="glitch-wrapper">
          <h2 className="glitch" data-text="TRANG KHÔNG TỒN TẠI">
            TRANG KHÔNG TỒN TẠI
          </h2>
        </div>

        {/* Animated Message */}
        <p className="error-message">
          <span className="typewriter">
            Rất tiếc, trang bạn đang tìm kiếm đã biến mất vào không gian mạng...
          </span>
        </p>

        {/* Interactive Elements */}
        <div className="interactive-elements">
          <div className="floating-icons">
            <button 
              type="button" 
              className="icon-wrapper icon-1" 
              onMouseEnter={handleIconHover}
              aria-label="Rocket icon animation"
            >
              🚀
            </button>
            <button 
              type="button" 
              className="icon-wrapper icon-2" 
              onMouseEnter={handleIconHover}
              aria-label="Star icon animation"
            >
              ⭐
            </button>
            <button 
              type="button" 
              className="icon-wrapper icon-3" 
              onMouseEnter={handleIconHover}
              aria-label="Glowing star icon animation"
            >
              🌟
            </button>
            <button 
              type="button" 
              className="icon-wrapper icon-4" 
              onMouseEnter={handleIconHover}
              aria-label="Sparkle icon animation"
            >
              💫
            </button>
          </div>
        </div>

        {/* Animated Button */}
        <div className="button-container">
          <Link to={ROUTES.HOME} className="neo-button">
            <span className="button-text">VỀ TRANG CHỦ</span>
            <div className="button-bg"></div>
            <div className="button-shine"></div>
          </Link>
        </div>

        {/* Progress Bar Animation */}
        <div className="progress-container">
          <div className="progress-label">Đang tìm kiếm trang thay thế...</div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>
    </div>
  );
}
