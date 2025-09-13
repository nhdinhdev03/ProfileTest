import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import './ScrollToTop.scss'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Memoize easing function
  const easeInOutQuart = useMemo(() => {
    return (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  }, [])

  // Throttled scroll handler cho performance tốt hơn
  const handleScroll = useCallback(() => {
    const scrolled = window.pageYOffset
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(scrolled / maxScroll, 1)
    
    setIsVisible(scrolled > 300)
    setScrollProgress(progress)
  }, [])

  // Throttle function để giảm số lần gọi
  const throttle = useCallback((func, delay) => {
    let timeoutId
    let lastExecTime = 0
    return function (...args) {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func.apply(this, args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }, [])

  // Memoize throttled scroll handler
  const throttledScrollHandler = useMemo(
    () => throttle(handleScroll, 16), // ~60fps
    [handleScroll, throttle]
  )

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
    }
  }, [throttledScrollHandler])

  const scrollToTop = useCallback(() => {
    // Enhanced smooth scroll to top with custom animation
    const startY = window.scrollY
    const duration = Math.min(startY / 2, 1000) // Max 1 second
    let startTime = null

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
  }, [easeInOutQuart])

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
                scaleY: scrollProgress
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: scrollProgress }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
