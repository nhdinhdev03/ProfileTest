import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiCode, FiDatabase, FiServer, FiTool, FiTrendingUp,
  FiAward, FiTarget, FiActivity, FiBarChart, FiLayers
} from 'react-icons/fi'
import { 
  SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiPython, SiOpenjdk,
  SiMongodb, SiPostgresql, SiRedis, SiDocker, SiAmazonaws, SiGit,
  SiTailwindcss, SiSass, SiVuedotjs, SiExpress, SiGraphql, SiMysql
} from 'react-icons/si'
import './Skills.scss'
import TechMarquee from '../TechMarquee/TechMarquee'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState('frontend')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [particles, setParticles] = useState([])
  const [skillsData, setSkillsData] = useState({})
  const skillsRef = useRef(null)
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 })

  // Enhanced skills data with more details
  const skillCategories = useMemo(() => ({
    frontend: {
      title: 'Frontend Development',
      icon: FiCode,
      color: '#61DAFB',
      gradient: 'linear-gradient(135deg, #61DAFB 0%, #21D4FD 100%)',
      description: 'Tạo ra những giao diện người dùng đẹp mắt và tương tác',
      skills: [
        { name: 'React', icon: SiReact, level: 95, experience: '3+ năm', projects: 25, color: '#61DAFB' },
        { name: 'JavaScript', icon: SiJavascript, level: 92, experience: '4+ năm', projects: 40, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, level: 88, experience: '2+ năm', projects: 18, color: '#3178C6' },
        { name: 'Vue.js', icon: SiVuedotjs, level: 82, experience: '1.5+ năm', projects: 12, color: '#4FC08D' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, experience: '2+ năm', projects: 20, color: '#06B6D4' },
        { name: 'Sass/SCSS', icon: SiSass, level: 85, experience: '3+ năm', projects: 30, color: '#CC6699' }
      ]
    },
    backend: {
      title: 'Backend Development', 
      icon: FiServer,
      color: '#339933',
      gradient: 'linear-gradient(135deg, #339933 0%, #68D391 100%)',
      description: 'Xây dựng API mạnh mẽ và hệ thống backend scalable',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: 90, experience: '3+ năm', projects: 22, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, level: 88, experience: '3+ năm', projects: 20, color: '#000000' },
        { name: 'Python', icon: SiPython, level: 85, experience: '2+ năm', projects: 15, color: '#3776AB' },
        { name: 'Java', icon: SiOpenjdk, level: 80, experience: '2+ năm', projects: 12, color: '#ED8B00' },
        { name: 'GraphQL', icon: SiGraphql, level: 75, experience: '1+ năm', projects: 8, color: '#E10098' }
      ]
    },
    database: {
      title: 'Database & Storage',
      icon: FiDatabase,
      color: '#336791',
      gradient: 'linear-gradient(135deg, #336791 0%, #4A90E2 100%)',
      description: 'Thiết kế và quản lý cơ sở dữ liệu hiệu quả',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 88, experience: '3+ năm', projects: 20, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 85, experience: '2+ năm', projects: 15, color: '#336791' },
        { name: 'MySQL', icon: SiMysql, level: 82, experience: '2+ năm', projects: 18, color: '#4479A1' },
        { name: 'Redis', icon: SiRedis, level: 78, experience: '1.5+ năm', projects: 10, color: '#DC382D' }
      ]
    },
    devops: {
      title: 'DevOps & Tools',
      icon: FiTool,
      color: '#FF9900',
      gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6B6B 100%)',
      description: 'Triển khai và quản lý hạ tầng ứng dụng',
      skills: [
        { name: 'Docker', icon: SiDocker, level: 85, experience: '2+ năm', projects: 16, color: '#2496ED' },
        { name: 'AWS', icon: SiAmazonaws, level: 80, experience: '1.5+ năm', projects: 12, color: '#FF9900' },
        { name: 'Git', icon: SiGit, level: 95, experience: '4+ năm', projects: 50, color: '#F05032' }
      ]
    }
  }), [])

  // Initialize particles for background effect
  useEffect(() => {
    const particleCount = 20
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#61DAFB', '#339933', '#336791', '#FF9900'][Math.floor(Math.random() * 4)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  // Mouse move handler for 3D effects
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        mouseX.set(event.clientX - centerX)
        mouseY.set(event.clientY - centerY)
      }
    }

    const skillsElement = skillsRef.current
    if (skillsElement) {
      skillsElement.addEventListener('mousemove', handleMouseMove)
      return () => skillsElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Simulate loading skills data
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkillsData(skillCategories)
    }, 500)
    return () => clearTimeout(timer)
  }, [skillCategories])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  }

  const skillVariants = {
    hidden: { x: -50, opacity: 0, rotateY: -45 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    }
  }

  return (
    <section id="skills" className="skills section" ref={skillsRef}>
      {/* Animated Particles Background */}
      <div className="skills__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="skills__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div
          ref={ref}
          className="skills__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <motion.h2
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
            >
       
              <span className="skills__title-highlight">Kỹ Năng Chuyên Môn</span>
            </motion.h2>
            <motion.p
              style={{
                transform: "translateZ(20px)"
              }}
            >
              Các công nghệ và công cụ tôi sử dụng để tạo ra những sản phẩm tuyệt vời
            </motion.p>
          </motion.div>

          {/* Enhanced Tech Marquee */}
          <motion.div 
            className="skills__marquee-wrapper"
            variants={itemVariants}
          >
            <TechMarquee showHeader={false} compact direction="ltr" />
          </motion.div>

          {/* Skills Categories Navigation */}
          <motion.div className="skills__categories" variants={itemVariants}>
            <div className="skills__categories-header">
              <FiLayers className="skills__categories-icon" />
              <h3>Lĩnh Vực Chuyên Môn</h3>
            </div>
            <div className="skills__categories-nav">
              {Object.entries(skillsData).map(([key, category]) => {
                const IconComponent = category.icon
                return (
                  <motion.button
                    key={key}
                    className={`skills__category-btn ${
                      activeCategory === key ? 'skills__category-btn--active' : ''
                    }`}
                    onClick={() => setActiveCategory(key)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: activeCategory === key ? category.gradient : undefined
                    }}
                  >
                    <motion.div
                      className="skills__category-icon"
                      animate={{
                        rotate: activeCategory === key ? [0, 10, -10, 0] : 0,
                        scale: activeCategory === key ? [1, 1.1, 1] : 1
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: activeCategory === key ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                      <IconComponent />
                    </motion.div>
                    <span className="skills__category-title">{category.title}</span>
                    <span className="skills__category-count">
                      {category.skills.length} skills
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Skills Display */}
          <AnimatePresence mode="wait">
            {skillsData[activeCategory] && (
              <motion.div
                key={activeCategory}
                className="skills__display"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="skills__display-header">
                  <motion.div
                    className="skills__display-icon"
                    style={{
                      background: skillsData[activeCategory].gradient
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${skillsData[activeCategory].color}40`,
                        `0 0 40px ${skillsData[activeCategory].color}60`,
                        `0 0 20px ${skillsData[activeCategory].color}40`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {React.createElement(skillsData[activeCategory].icon)}
                  </motion.div>
                  <div className="skills__display-info">
                    <h3>{skillsData[activeCategory].title}</h3>
                    <p>{skillsData[activeCategory].description}</p>
                  </div>
                </div>

                <motion.div 
                  className="skills__grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {skillsData[activeCategory].skills.map((skill, index) => {
                    const IconComponent = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
                        className="skills__item glass-card"
                        variants={skillVariants}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 10,
                          z: 20,
                          transition: { type: 'spring', stiffness: 300, damping: 20 }
                        }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          transformStyle: "preserve-3d"
                        }}
                      >
                        {/* Skill Header */}
                        <div className="skills__item-header">
                          <motion.div
                            className="skills__item-icon"
                            style={{
                              color: skill.color,
                              transform: "translateZ(10px)"
                            }}
                            animate={{
                              rotate: hoveredSkill === skill.name ? [0, 360] : 0,
                              scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeInOut"
                            }}
                          >
                            <IconComponent />
                          </motion.div>
                          <div className="skills__item-info">
                            <h4 className="skills__item-name">{skill.name}</h4>
                            <span className="skills__item-experience">{skill.experience}</span>
                          </div>
                          <motion.div
                            className="skills__item-level-badge"
                            animate={{
                              background: [
                                `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
                                `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                                `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {skill.level}%
                          </motion.div>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="skills__item-progress">
                          <div className="skills__progress-label">
                            <span>Thành thạo</span>
                            <motion.span
                              className="skills__progress-percentage"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              {skill.level}%
                            </motion.span>
                          </div>
                          <div className="skills__progress-bar">
                            <motion.div
                              className="skills__progress-fill"
                              style={{
                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 1.5,
                                delay: 0.3 + index * 0.1,
                                ease: "easeOut"
                              }}
                            />
                            <motion.div
                              className="skills__progress-glow"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${skill.color}60, transparent)`
                              }}
                              animate={{
                                x: ['-100%', '100%']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1 + index * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          </div>
                        </div>

                        {/* Project Stats */}
                        <div className="skills__item-stats">
                          <div className="skills__stat">
                            <FiTarget className="skills__stat-icon" />
                            <span className="skills__stat-value">{skill.projects}</span>
                            <span className="skills__stat-label">Dự án</span>
                          </div>
                          <div className="skills__stat">
                            <FiTrendingUp className="skills__stat-icon" />
                            <span className="skills__stat-value">{skill.level}%</span>
                            <span className="skills__stat-label">Thành thạo</span>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <motion.div
                          className="skills__item-overlay"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          style={{
                            background: `linear-gradient(135deg, ${skill.color}10, ${skill.color}20)`
                          }}
                        />

                        {/* 3D Border Effect */}
                        <motion.div
                          className="skills__item-border"
                          style={{
                            borderColor: skill.color
                          }}
                          animate={{
                            opacity: hoveredSkill === skill.name ? 1 : 0,
                            scale: hoveredSkill === skill.name ? [1, 1.02, 1] : 1
                          }}
                          transition={{
                            duration: 0.3
                          }}
                        />
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Category Summary */}
                <motion.div
                  className="skills__summary"
                  variants={itemVariants}
                >
                  <div className="skills__summary-stats">
                    <div className="skills__summary-stat">
                      <FiAward className="skills__summary-icon" />
                      <div className="skills__summary-info">
                        <span className="skills__summary-value">
                          {skillsData[activeCategory].skills.length}
                        </span>
                        <span className="skills__summary-label">Công nghệ</span>
                      </div>
                    </div>
                    <div className="skills__summary-stat">
                      <FiActivity className="skills__summary-icon" />
                      <div className="skills__summary-info">
                        <span className="skills__summary-value">
                          {Math.round(
                            skillsData[activeCategory].skills.reduce((acc, skill) => acc + skill.level, 0) /
                            skillsData[activeCategory].skills.length
                          )}%
                        </span>
                        <span className="skills__summary-label">Trung bình</span>
                      </div>
                    </div>
                    <div className="skills__summary-stat">
                      <FiBarChart className="skills__summary-icon" />
                      <div className="skills__summary-info">
                        <span className="skills__summary-value">
                          {skillsData[activeCategory].skills.reduce((acc, skill) => acc + skill.projects, 0)}
                        </span>
                        <span className="skills__summary-label">Dự án</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
