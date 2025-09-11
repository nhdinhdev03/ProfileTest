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
      const shouldShow = scrollTop > 300

      setShowScrollTop(shouldShow)
      
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

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && isScrolling && (
          <motion.button
            className="footer__scroll-top-floating"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 20
            }}
            aria-label="Scroll to top"
            title="Cuộn lên đầu trang"
          >
            <FiArrowUp />
            <div className="scroll-progress">
              <motion.div
                className="scroll-progress-bar"
                style={{
                  height: `${Math.min(100, (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
                }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
