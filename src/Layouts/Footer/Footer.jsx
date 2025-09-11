import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHeart, 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiArrowUp,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiExternalLink,
  FiCode,
  FiDatabase,
  FiServer,
  FiSmartphone
} from 'react-icons/fi'
import './Footer.scss'

function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollTimeoutRef = useRef(null)

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiMail, url: 'mailto:developer@example.com', label: 'Email' }
  ]

  const contactInfo = [
    { icon: FiMail, text: 'hoangdinh@example.com', href: 'mailto:hoangdinh@example.com' },
    { icon: FiPhone, text: '+84 123 456 789', href: 'tel:+84123456789' },
    { icon: FiMapPin, text: 'Ho Chi Minh City, Vietnam', href: 'https://maps.google.com' }
  ]

  const skillCategories = [
    { icon: FiCode, title: 'Frontend', skills: ['React', 'Vue', 'Angular'] },
    { icon: FiServer, title: 'Backend', skills: ['Node.js', 'Python', 'PHP'] },
    { icon: FiDatabase, title: 'Database', skills: ['MongoDB', 'MySQL', 'PostgreSQL'] },
    { icon: FiSmartphone, title: 'Mobile', skills: ['React Native', 'Flutter'] }
  ]

  const quickLinks = [
    { name: 'Portfolio', href: '#projects', internal: true },
    { name: 'Resume/CV', href: '/resume.pdf', internal: false },
    { name: 'Blog Posts', href: '#blog', internal: true },
    { name: 'Contact Form', href: '#contact', internal: true }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      const shouldShow = scrollTop > 300

      setShowScrollTop(shouldShow)
      setScrollProgress(Math.min(100, scrollPercent))
      
      if (shouldShow) {
        setIsScrolling(true)
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        
        // Set timeout to hide scroll indicator after 2 seconds of no scrolling
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 2000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    const startPosition = window.pageYOffset
    const startTime = performance.now()
    const duration = 1200 // 1.2 seconds for smooth animation
    
    // Custom easing function for smoother animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Apply easing function
      const easedProgress = easeOutCubic(progress)
      
      // Calculate current position
      const currentPosition = startPosition * (1 - easedProgress)
      
      window.scrollTo(0, currentPosition)
      
      // Continue animation if not finished
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }
    
    // Start the animation
    requestAnimationFrame(animateScroll)
    
    setIsScrolling(true)
    
    // Reset timeout when manually clicked
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    // Hide button after scroll completes + 1 second
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, duration + 1000)
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          <div className="footer__grid">
            {/* Brand & Introduction */}
            <div className="footer__brand">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="footer__title">Hoang Dinh</h3>
                <p className="footer__subtitle">Full Stack Developer</p>
                <p className="footer__description">
                  Tạo ra những trải nghiệm web tuyệt vời với công nghệ hiện đại và tư duy sáng tạo. 
                  Chuyên về phát triển ứng dụng web và mobile với hiệu suất cao.
                </p>
                
                {/* CTA Buttons */}
                <div className="footer__cta">
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__cta-btn footer__cta-btn--primary"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiDownload />
                    <span>Download CV</span>
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="footer__cta-btn footer__cta-btn--secondary"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiMail />
                    <span>Hire Me</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="footer__section-title">Quick Links</h4>
                <ul className="footer__links">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        target={link.internal ? '_self' : '_blank'}
                        rel={link.internal ? '' : 'noopener noreferrer'}
                        className="footer__link"
                      >
                        <span>{link.name}</span>
                        {!link.internal && <FiExternalLink className="footer__link-icon" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Skills Overview */}
            <div className="footer__section">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="footer__section-title">Tech Stack</h4>
                <div className="footer__skills">
                  {skillCategories.map((category, index) => {
                    const IconComponent = category.icon
                    return (
                      <motion.div
                        key={index}
                        className="footer__skill-category"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      >
                        <div className="footer__skill-header">
                          <IconComponent className="footer__skill-icon" />
                          <span className="footer__skill-title">{category.title}</span>
                        </div>
                        <div className="footer__skill-tags">
                          {category.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="footer__skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="footer__section">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="footer__section-title">Get In Touch</h4>
                <div className="footer__contact">
                  {contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon
                    return (
                      <motion.a
                        key={index}
                        href={contact.href}
                        target={contact.icon === FiMapPin ? '_blank' : '_self'}
                        rel={contact.icon === FiMapPin ? 'noopener noreferrer' : ''}
                        className="footer__contact-item"
                        whileHover={{ scale: 1.02, x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      >
                        <IconComponent className="footer__contact-icon" />
                        <span className="footer__contact-text">{contact.text}</span>
                      </motion.a>
                    )
                  })}
                </div>

                {/* Social Links */}
                <div className="footer__social-section">
                  <h5 className="footer__social-title">Follow Me</h5>
                  <div className="footer__social">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer__social-link"
                          aria-label={social.label}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        >
                          <IconComponent />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="footer__bottom-content">
            <div className="footer__copyright">
              <p>
                © {currentYear} Made with <FiHeart className="footer__heart" /> by Hoang Dinh
              </p>
            </div>
            <div className="footer__legal">
              <a href="/privacy" className="footer__legal-link">Privacy Policy</a>
              <span className="footer__legal-divider">•</span>
              <a href="/terms" className="footer__legal-link">Terms of Service</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="footer__scroll-container"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
          >
            {/* Progress Ring */}
            <svg className="footer__scroll-progress-ring" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
                className="footer__scroll-progress-bg"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="footer__scroll-progress-fill"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`,
                }}
                initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                animate={{ 
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`,
                  rotate: scrollProgress > 0 ? 360 : 0
                }}
                transition={{ 
                  strokeDashoffset: { duration: 0.3, ease: "easeOut" },
                  rotate: { duration: 8, ease: "linear", repeat: Infinity }
                }}
                transformOrigin="50% 50%"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Main Button */}
            <motion.button
              className="footer__scroll-top-button"
              onClick={scrollToTop}
              whileHover={{ 
                scale: 1.1, 
                y: -3,
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17
              }}
              aria-label="Scroll to top"
              title="Cuộn lên đầu trang"
            >
              <motion.div
                className="footer__scroll-icon-wrapper"
                animate={{
                  y: isScrolling ? [-2, 2, -2] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isScrolling ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <FiArrowUp className="footer__scroll-icon" />
              </motion.div>

              {/* Ripple Effect */}
              <motion.div
                className="footer__scroll-ripple"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            {/* Floating Particles */}
            <div className="footer__scroll-particles">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="footer__scroll-particle"
                  animate={{
                    y: [-10, -30, -10],
                    x: [0, (i - 1) * 5, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
