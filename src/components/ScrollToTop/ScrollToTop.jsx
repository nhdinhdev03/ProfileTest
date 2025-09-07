import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import './ScrollToTop.scss'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 17
          }}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <FiArrowUp />
          <div className="scroll-to-top__progress">
            <motion.div
              className="scroll-to-top__progress-bar"
              style={{
                pathLength: typeof window !== 'undefined' ? 
                  window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) : 0
              }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
