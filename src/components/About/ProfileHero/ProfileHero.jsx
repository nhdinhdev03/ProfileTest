import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { 
  FiCode, FiZap, FiActivity,
  FiMail, FiDownload, FiEye
} from "react-icons/fi";

import "./ProfileHero.scss";

const ProfileHero = ({ profile, light }) => {
  const { t } = useTranslation();
  const [particles, setParticles] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const heroRef = useRef(null)
  
  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 })

  // Initialize particles - optimized for performance
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 4 : 8; // Reduced from 12
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2, // Reduced size
        speed: Math.random() * 2 + 1, // Reduced speed
        opacity: Math.random() * 0.3 + 0.1, // Reduced opacity
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  // Mouse move handler
  const handleMouseMove = (event) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(event.clientX - centerX)
      mouseY.set(event.clientY - centerY)
    }
  }

  return (
    <motion.section 
      ref={heroRef}
      className="profile-hero glass-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Animated Particles */}
      <div className="profile-hero__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="profile-hero__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="profile-hero__content">
        <motion.div 
          className="profile-image"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div
            className="profile-image__container"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <img src={profile?.avatar_url || "/api/placeholder/300/300"} alt="Profile" />
            <motion.div
              className="profile-image__glow"
              animate={{
                opacity: isHovered ? [0.3, 0.7, 0.3] : [0.1, 0.3, 0.1],
                scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="profile-image__ring"
              animate={{
                rotate: [0, 360],
                scale: isHovered ? [1, 1.05, 1] : [1, 1.02, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            />
          </motion.div>
          
          <motion.div className="profile-status">
            <motion.span 
              className={`status-badge ${light ? "light-mode" : "dark-mode"}`}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.3)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 10px rgba(16, 185, 129, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <motion.div
                className="status-badge__dot"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              {light ? t('about.light_mode_active') : t('about.dark_mode_active')}
            </motion.span>
          </motion.div>
        </motion.div>
        
        <div className="profile-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <motion.span 
              className="name-highlight"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'linear-gradient(90deg, var(--gradient-primary), var(--gradient-secondary), var(--gradient-primary))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {profile?.name || "Nguyen Hoang Dinh"}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            {t('about.job_title')}
          </motion.p>
          
          <motion.div 
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            <motion.p>
              <motion.span 
                className="highlight-primary"
                whileHover={{ scale: 1.05, color: 'var(--primary-light)' }}
              >
                {t('about.description_line1')}
              </motion.span>
              {t('about.specializing_in')}
              <motion.span 
                className="highlight-secondary"
                whileHover={{ scale: 1.05, color: 'var(--secondary-light)' }}
              >
                {t('about.description_line1_highlight')}
              </motion.span>
              {" " + t('about.and') + " "}
              <motion.span 
                className="highlight-accent"
                whileHover={{ scale: 1.05, color: 'var(--accent-light)' }}
              >
                {t('about.description_line1_end')}
              </motion.span>
              .
            </motion.p>
            
            <motion.p>
              <motion.span 
                className="highlight-primary"
                whileHover={{ scale: 1.05 }}
              >
                {t('about.description_line2')}
              </motion.span>
              {t('about.connect_devops') + " "}
              <motion.span 
                className="highlight-secondary"
                whileHover={{ scale: 1.05 }}
              >
                {t('about.description_line2_highlight')}
              </motion.span>
              .
            </motion.p>
            
            <motion.p>
              <motion.span 
                className="highlight-accent"
                whileHover={{ scale: 1.05 }}
              >
                {t('about.description_line3')}
              </motion.span>
              {t('about.devops_learning')}
              <span className="italic">
                {profile?.bio || t('about.default_bio')}
              </span>
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="profile-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <motion.span 
              className="badge badge-green"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiZap className="badge-icon" />
              {t('about.badge_available')}
            </motion.span>
            <motion.span 
              className="badge badge-blue"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiCode className="badge-icon" />
              {t('about.badge_web_dev')}
            </motion.span>
            <motion.span 
              className="badge badge-orange"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiActivity className="badge-icon" />
              {t('about.badge_system_design')}
            </motion.span>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            className="profile-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          >
            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail />
              {t('about.contact_action')}
            </motion.a>
            <motion.a
              href="/resume.pdf"
              className="btn btn-outline"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              <FiDownload />
              {t('about.download_cv')}
            </motion.a>
            <motion.a
              href="#projects"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEye />
              {t('about.view_projects')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
};

ProfileHero.propTypes = {
  profile: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};

export default ProfileHero;