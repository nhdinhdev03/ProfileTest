import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiTrendingUp, FiUsers, FiCode, FiAward, FiStar, FiGitBranch } from 'react-icons/fi'
import './Stats.scss'

const Stats = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    rating: 0,
    commits: 0,
    awards: 0
  })

  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, amount: 0.3 })

  const statsData = [
    {
      id: 'projects',
      icon: FiCode,
      value: 100,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successful projects delivered',
      color: '#6366f1',
      delay: 0
    },
    {
      id: 'clients',
      icon: FiUsers,
      value: 50,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied customers worldwide',
      color: '#10b981',
      delay: 0.2
    },
    {
      id: 'experience',
      icon: FiTrendingUp,
      value: 3,
      suffix: '+',
      label: 'Years Experience',
      description: 'Professional development experience',
      color: '#f59e0b',
      delay: 0.4
    },
    {
      id: 'rating',
      icon: FiStar,
      value: 5.0,
      suffix: '',
      label: 'Average Rating',
      description: 'Client satisfaction score',
      color: '#ef4444',
      delay: 0.6
    },
    {
      id: 'commits',
      icon: FiGitBranch,
      value: 2500,
      suffix: '+',
      label: 'GitHub Commits',
      description: 'Code contributions this year',
      color: '#8b5cf6',
      delay: 0.8
    },
    {
      id: 'awards',
      icon: FiAward,
      value: 12,
      suffix: '+',
      label: 'Awards Won',
      description: 'Recognition and achievements',
      color: '#ec4899',
      delay: 1.0
    }
  ]

  // Animated counter function
  const animateCounter = (target, duration = 2000, isDecimal = false) => {
    let start = 0
    const increment = target / (duration / 16)
    
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          start = target
          clearInterval(timer)
          resolve(isDecimal ? start.toFixed(1) : Math.floor(start))
        }
        return isDecimal ? start.toFixed(1) : Math.floor(start)
      }, 16)
    })
  }

  useEffect(() => {
    if (isInView) {
      // Animate all counters when component comes into view
      const animateAllCounters = async () => {
        const promises = statsData.map(async (stat) => {
          const isDecimal = stat.id === 'rating'
          let currentValue = 0
          const target = stat.value
          const duration = 2000
          const increment = target / (duration / 16)
          
          const animate = () => {
            return new Promise((resolve) => {
              const timer = setInterval(() => {
                currentValue += increment
                if (currentValue >= target) {
                  currentValue = target
                  clearInterval(timer)
                  resolve()
                }
                
                setCounters(prev => ({
                  ...prev,
                  [stat.id]: isDecimal ? parseFloat(currentValue.toFixed(1)) : Math.floor(currentValue)
                }))
              }, 16)
            })
          }
          
          // Add delay for staggered animation
          await new Promise(resolve => setTimeout(resolve, stat.delay * 200))
          return animate()
        })
        
        await Promise.all(promises)
      }

      animateAllCounters()
    }
  }, [isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="stats" className="stats" ref={statsRef}>
      <div className="stats__container">
        <motion.div
          className="stats__header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="stats__title-section" variants={itemVariants}>
            <h2 className="stats__title">
              <span className="stats__title-text">Impressive</span>
              <span className="stats__title-highlight">Numbers</span>
            </h2>
            <p className="stats__description">
              Những con số ấn tượng trong hành trình phát triển sự nghiệp
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="stats__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.id}
                className="stats__card glass-card"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                style={{ '--stat-color': stat.color }}
              >
                <div className="stats__card-background">
                  <div className="stats__card-circle"></div>
                </div>

                <div className="stats__card-content">
                  <motion.div 
                    className="stats__icon-wrapper"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="stats__icon" />
                  </motion.div>

                  <div className="stats__number-section">
                    <motion.div 
                      className="stats__number"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: stat.delay + 0.5, type: 'spring', stiffness: 200 }}
                    >
                      {counters[stat.id]}{stat.suffix}
                    </motion.div>
                    
                    <motion.div
                      className="stats__progress-ring"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      transition={{ delay: stat.delay + 0.3, duration: 1.5 }}
                    >
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="var(--border-color)"
                          strokeWidth="3"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke={stat.color}
                          strokeWidth="3"
                          fill="transparent"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 35}`}
                          strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.75)}`}
                          initial={{ strokeDashoffset: `${2 * Math.PI * 35}` }}
                          animate={isInView ? { 
                            strokeDashoffset: `${2 * Math.PI * 35 * (1 - 0.75)}` 
                          } : { 
                            strokeDashoffset: `${2 * Math.PI * 35}` 
                          }}
                          transition={{ delay: stat.delay + 0.5, duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <div className="stats__info">
                    <h3 className="stats__label">{stat.label}</h3>
                    <p className="stats__description-text">{stat.description}</p>
                  </div>

                  <motion.div
                    className="stats__sparkles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: stat.delay + 1, duration: 0.5 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="stats__sparkle"
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3 + stat.delay,
                          ease: "easeInOut"
                        }}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${10 + i * 5}%`
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  className="stats__card-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stats__overlay-content">
                    <IconComponent className="stats__overlay-icon" />
                    <span className="stats__overlay-text">View Details</span>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="stats__bottom-section"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="stats__achievement-badges">
            <motion.div 
              className="stats__badge"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiAward className="stats__badge-icon" />
              <span>Top Developer 2023</span>
            </motion.div>
            <motion.div 
              className="stats__badge"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiStar className="stats__badge-icon" />
              <span>5-Star Rating</span>
            </motion.div>
            <motion.div 
              className="stats__badge"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiTrendingUp className="stats__badge-icon" />
              <span>Fast Growing</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="stats__background">
        <div className="stats__background-grid"></div>
        <div className="stats__background-gradient"></div>
      </div>
    </section>
  )
}

export default Stats
