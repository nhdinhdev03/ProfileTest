import React, { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHeart, 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiArrowUp,
  FiPhone,
  FiMapPin,
  FiDownload
} from 'react-icons/fi'
import './Footer.scss'

const Footer = memo(() => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const scrollTimeoutRef = useRef(null)

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiMail, url: 'mailto:hoangdinh@example.com', label: 'Email' }
  ]

  const contactInfo = [
    { icon: FiMail, text: 'hoangdinh@example.com', href: 'mailto:hoangdinh@example.com' },
    { icon: FiPhone, text: '+84 123 456 789', href: 'tel:+84123456789' },
    { icon: FiMapPin, text: 'Hậu Giang, Việt Nam', href: '#' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.pageYOffset > 300
      setShowScrollTop(shouldShow)
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* Main Info */}
          <div className="footer__main">
            <div className="footer__brand">
              <h3 className="footer__title">Hoang Dinh</h3>
              <p className="footer__subtitle">Full Stack Developer</p>
              <p className="footer__description">
                Tạo ra những trải nghiệm web tuyệt vời với công nghệ hiện đại và tư duy sáng tạo.
              </p>
            </div>

            <div className="footer__cta">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__cta-btn footer__cta-btn--primary"
              >
                <FiDownload />
                <span>Download CV</span>
              </a>
              <a
                href="#contact"
                className="footer__cta-btn footer__cta-btn--secondary"
              >
                <FiMail />
                <span>Liên hệ</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer__contact">
            <h4 className="footer__section-title">Liên hệ</h4>
            <div className="footer__contact-list">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="footer__contact-item"
                  >
                    <IconComponent className="footer__contact-icon" />
                    <span className="footer__contact-text">{contact.text}</span>
                  </a>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="footer__social">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Made with <FiHeart className="footer__heart" /> by Hoang Dinh
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="footer__scroll-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer