import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import './Footer.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef(null)

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiMail, url: 'mailto:developer@example.com', label: 'Email' }
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
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <h3 className="footer__title">Professional Developer</h3>
              <p className="footer__description">
                Tạo ra những trải nghiệm web tuyệt vời với đam mê và chuyên môn
              </p>
            </div>

            <div className="footer__links">
              <div className="footer__section">
                <h4>Navigation</h4>
                <ul>
                  <li><a href="#home">Trang chủ</a></li>
                  <li><a href="#about">Về tôi</a></li>
                  <li><a href="#skills">Kỹ năng</a></li>
                  <li><a href="#experience">Kinh nghiệm</a></li>
                </ul>
              </div>

              <div className="footer__section">
                <h4>Projects</h4>
                <ul>
                  <li><a href="#projects">Dự án</a></li>
                  <li><a href="#contact">Liên hệ</a></li>
                  <li><a href="/resume.pdf" target="_blank">CV</a></li>
                </ul>
              </div>

              <div className="footer__section">
                <h4>Kết nối</h4>
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
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>
                © {currentYear} Made with <FiHeart className="footer__heart" /> by Professional Developer
              </p>
            </div>
          </div>
        </div>
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
