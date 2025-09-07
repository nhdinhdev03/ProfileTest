import React from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import './Footer.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiMail, url: 'mailto:developer@example.com', label: 'Email' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            
            <motion.button
              className="footer__scroll-top"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <FiArrowUp />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
