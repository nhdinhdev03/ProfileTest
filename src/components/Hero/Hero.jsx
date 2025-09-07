import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin, FiChevronDown } from 'react-icons/fi'
import { FaReact, FaJsSquare, FaNodeJs, FaPython } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss } from 'react-icons/si'
import './Hero.scss'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [particles, setParticles] = useState([])
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))
  
  const heroRef = useRef(null)
  
  const roles = [
    'Full Stack Developer',
    'Frontend Specialist', 
    'React Expert',
    'UI/UX Enthusiast',
    'Problem Solver'
  ]

  const techIcons = [
    { icon: FaReact, color: '#61DAFB', delay: 0 },
    { icon: FaJsSquare, color: '#F7DF1E', delay: 0.2 },
    { icon: SiTypescript, color: '#3178C6', delay: 0.4 },
    { icon: FaNodeJs, color: '#339933', delay: 0.6 },
    { icon: SiTailwindcss, color: '#06B6D4', delay: 0.8 },
    { icon: FaPython, color: '#3776AB', delay: 1.0 }
  ]

  useEffect(() => {
    const currentRole = roles[currentIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % roles.length)
      } else {
        const nextText = isDeleting 
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
        setDisplayText(nextText)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, roles])

  // Initialize particles
  useEffect(() => {
    const particleCount = 50
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        direction: Math.random() * 360
      })
    }
    
    setParticles(newParticles)
  }, [])

  // Mouse move handler for 3D effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        mouseX.set(event.clientX - centerX)
        mouseY.set(event.clientY - centerY)
      }
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove)
      heroRef.current.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        if (heroRef.current) {
          heroRef.current.removeEventListener('mousemove', handleMouseMove)
          heroRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Floating particles */}
      <div className="hero__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="hero__particle"
            initial={{ 
              x: `${particle.x}vw`, 
              y: `${particle.y}vh`,
              opacity: 0
            }}
            animate={{ 
              x: [`${particle.x}vw`, `${(particle.x + 10) % 100}vw`],
              y: [`${particle.y}vh`, `${(particle.y + 5) % 100}vh`],
              opacity: [0, particle.opacity, 0]
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: 'var(--primary-light)',
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="hero__container">
        <motion.div 
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__greeting" variants={itemVariants}>
            <span className="hero__greeting-text">Xin chào! 👋 Tôi là</span>
          </motion.div>

          <motion.h1 className="hero__name" variants={itemVariants}>
            <span className="hero__name-text">Professional</span>
            <span className="hero__name-highlight">Developer</span>
          </motion.h1>

          <motion.div className="hero__role" variants={itemVariants}>
            <span className="hero__role-label">Tôi là một </span>
            <span className="hero__role-dynamic">
              {displayText}
              <span className="hero__cursor">|</span>
            </span>
          </motion.div>

          <motion.p className="hero__description" variants={itemVariants}>
            Chuyên gia phát triển web với hơn 3 năm kinh nghiệm, 
            tạo ra những ứng dụng web hiện đại, responsive và user-friendly. 
            Đam mê công nghệ mới và luôn sẵn sàng đối mặt với thử thách.
          </motion.p>

          <motion.div className="hero__location" variants={itemVariants}>
            <FiMapPin className="hero__location-icon" />
            <span>Hà Nội, Việt Nam</span>
          </motion.div>

          <motion.div className="hero__actions" variants={itemVariants}>
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail />
              Liên hệ với tôi
            </motion.a>
            <motion.a 
              href="/resume.pdf" 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              <FiDownload />
              Tải CV
            </motion.a>
          </motion.div>

          <motion.div className="hero__social" variants={itemVariants}>
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero__social-link"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiGithub />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero__social-link"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiLinkedin />
            </motion.a>
            <motion.a 
              href="mailto:developer@example.com"
              className="hero__social-link"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMail />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <div className="hero__avatar">
            <div className="hero__avatar-image">
              <img 
                src="/api/placeholder/300/300" 
                alt="Professional Developer" 
              />
            </div>
            <div className="hero__avatar-ring"></div>
          </div>

          <motion.div 
            className="hero__tech-stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {techIcons.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <motion.div
                  key={index}
                  className="hero__tech-icon"
                  style={{ 
                    '--icon-color': tech.color,
                    '--delay': tech.delay 
                  }}
                  initial={{ 
                    scale: 0, 
                    rotate: -180,
                    opacity: 0 
                  }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    opacity: 1 
                  }}
                  transition={{ 
                    delay: 1 + tech.delay,
                    type: 'spring',
                    stiffness: 200,
                    damping: 10
                  }}
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                >
                  <IconComponent />
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{
          opacity: { delay: 2 },
          y: { repeat: Infinity, duration: 2 }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiChevronDown />
        <span>Cuộn xuống</span>
      </motion.button>

      <div className="hero__background">
        <div className="hero__background-circle hero__background-circle--1"></div>
        <div className="hero__background-circle hero__background-circle--2"></div>
        <div className="hero__background-circle hero__background-circle--3"></div>
      </div>
    </section>
  )
}

export default Hero
