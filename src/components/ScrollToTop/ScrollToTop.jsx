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
    // Enhanced smooth scroll to top with custom animation
    const startY = window.scrollY
    const duration = Math.min(startY / 2, 1000) // Max 1 second
    let startTime = null

    const easeInOutQuart = (t) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    }

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easeInOutQuart(progress)
      
      window.scrollTo(0, startY * (1 - easedProgress))
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        window.scrollTo(0, 0)
      }
    }

    requestAnimationFrame(animateScroll)
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
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 25
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
