import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiEye, FiFilter, FiGrid, FiList, FiStar, FiZap } from 'react-icons/fi'
import useSaveScrollPosition from '../../hooks/useSaveScrollPosition'
import './Projects.scss'

function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Sử dụng hook lưu và khôi phục vị trí cuộn
  useSaveScrollPosition()
  
  // Default to Featured to match the section title "Dự Án Nổi Bật"
  const [filter, setFilter] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [floatingElements, setFloatingElements] = useState([])
  const [allProjectsLoaded, setAllProjectsLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  // Toggle to quickly disable 3D effects globally
  const enable3D = false
  
  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const projectsRef = useRef(null)

  // Gentle 3D transforms for projects
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [2, -2]), { stiffness: 80, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-2, 2]), { stiffness: 80, damping: 25 })

  // Enhanced mouse tracking for 3D effects
  useEffect(() => {
    if (shouldReduceMotion || !enable3D) return

    let rafId = null
    const handleMouseMove = (event) => {
      if (!projectsRef.current) return
      const rect = projectsRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        mouseX.set((event.clientX - centerX) / 20)
        mouseY.set((event.clientY - centerY) / 20)
      })
    }

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId)
      mouseX.set(0)
      mouseY.set(0)
    }

    const projectsElement = projectsRef.current
    if (projectsElement) {
      projectsElement.addEventListener('mousemove', handleMouseMove)
      projectsElement.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (rafId) cancelAnimationFrame(rafId)
        projectsElement.removeEventListener('mousemove', handleMouseMove)
        projectsElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mouseX, mouseY, shouldReduceMotion, enable3D])

  // Initialize gentle floating elements
  useEffect(() => {
    const elements = []
    for (let i = 0; i < 8; i++) { // Reduced from 15
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: [FiStar, FiZap][Math.floor(Math.random() * 2)], // Reduced icons
        size: Math.random() * 12 + 8, // Smaller
        speed: Math.random() * 2 + 1.5 // Slower
      })
    }
    setFloatingElements(elements)
  }, [])

  // Memoize featured projects data (load immediately)
  const featuredProjects = useMemo(() => [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Nền tảng thương mại điện tử hoàn chỉnh với tính năng thanh toán, quản lý đơn hàng và dashboard admin.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      category: 'fullstack',
      status: 'completed',
      year: '2024',
      complexity: 'advanced',
      performance: 95
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Ứng dụng quản lý công việc với tính năng real-time collaboration và notification system.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Express.js', 'Socket.io', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      category: 'frontend',
      status: 'completed',
      year: '2024',
      complexity: 'intermediate',
      performance: 88
    }
  ], [])

  // Lazy load other projects only when needed
  const getAllProjects = useCallback(() => [
    ...featuredProjects,
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Website portfolio responsive với animations đẹp mắt và performance tối ưu.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Framer Motion', 'SCSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      category: 'frontend',
      status: 'completed',
      year: '2023'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Dashboard thời tiết với charts tương tác và dự báo 7 ngày sử dụng API.',
      image: '/api/placeholder/600/400',
      technologies: ['TypeScript', 'Chart.js', 'Weather API'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      category: 'frontend',
      status: 'completed',
      year: '2023'
    },
    {
      id: 5,
      title: 'Social Media App',
      description: 'Ứng dụng mạng xã hội với tính năng chat real-time và upload media.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      category: 'mobile',
      status: 'in-progress',
      year: '2024'
    },
    {
      id: 6,
      title: 'Learning Platform',
      description: 'Nền tảng học trực tuyến với video streaming và quiz system.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Prisma', 'AWS S3'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      category: 'fullstack',
      status: 'completed',
      year: '2023'
    }
  ], [featuredProjects])

  // Current projects state - start with featured only
  const [currentProjects, setCurrentProjects] = useState(featuredProjects)

  // Load all projects when filter changes to non-featured
  useEffect(() => {
    if (filter !== 'featured' && !allProjectsLoaded) {
      // Simulate async loading (could be real API call)
      const timer = setTimeout(() => {
        setCurrentProjects(getAllProjects())
        setAllProjectsLoaded(true)
      }, 100) // Small delay to show optimization
      
      return () => clearTimeout(timer)
    }
  }, [filter, allProjectsLoaded, getAllProjects])

  const getComplexityIcon = useCallback((complexity) => {
    switch (complexity) {
      case 'advanced':
        return '🔥'
      case 'intermediate':
        return '⚡'
      default:
        return '💡'
    }
  }, [])

  // Dynamic categories based on current loaded projects
  const categories = useMemo(() => {
    const allProjects = allProjectsLoaded ? currentProjects : featuredProjects
    return [
      { id: 'featured', label: 'Nổi bật', count: allProjects.filter(p => p.featured).length },
      { id: 'all', label: 'Tất cả', count: allProjects.length },
      { id: 'fullstack', label: 'Full Stack', count: allProjects.filter(p => p.category === 'fullstack').length },
      { id: 'frontend', label: 'Frontend', count: allProjects.filter(p => p.category === 'frontend').length },
      { id: 'mobile', label: 'Mobile', count: allProjects.filter(p => p.category === 'mobile').length }
    ]
  }, [currentProjects, featuredProjects, allProjectsLoaded])

  // Keep filtered list in state for more predictable re-renders
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects)

  // Optimized filter handler
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
    
    // Load all projects if switching from featured
    if (newFilter !== 'featured' && !allProjectsLoaded) {
      setCurrentProjects(getAllProjects())
      setAllProjectsLoaded(true)
    }
  }, [allProjectsLoaded, getAllProjects])

  useEffect(() => {
    const projectsToFilter = filter === 'featured' ? featuredProjects : currentProjects
    const next = projectsToFilter.filter(project => {
      if (filter === 'all') return true
      if (filter === 'featured') return project.featured
      return project.category === filter
    })
    setFilteredProjects(next)
  }, [filter, currentProjects, featuredProjects])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      {/* Floating Background Elements (disabled for reduced motion and when out of view) */}
  {!shouldReduceMotion && inView && enable3D && (
        <div className="projects__floating-elements">
          {floatingElements.map((element) => {
          const IconComponent = element.icon
          return (
            <motion.div
              key={element.id}
              className="projects__floating-element"
              initial={{
                x: `${element.x}%`,
                y: `${element.y}%`,
                opacity: 0
              }}
              animate={{
                x: [`${element.x}%`, `${(element.x + 20) % 100}%`, `${element.x}%`],
                y: [`${element.y}%`, `${(element.y + 10) % 100}%`, `${element.y}%`],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: element.speed * 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                fontSize: element.size,
                color: 'var(--primary-light)'
              }}
            >
              <IconComponent />
            </motion.div>
          )
          })}
        </div>
      )}

      <div className="container">
        <motion.div
          ref={ref}
          className="projects__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
      perspective: enable3D ? 1500 : undefined,
      transformStyle: enable3D ? "preserve-3d" : undefined
          }}
        >
          <motion.div className="projects__header" variants={itemVariants}>
            <div className="projects__title-section">
              <h2 className="projects__title">
                <span className="projects__title-text">Dự Án </span>
                <span className="projects__title-highlight">Nổi Bật</span>
              </h2>
              <p className="projects__description">
                Những sản phẩm tôi đã tạo ra với đam mê và kỹ năng chuyên môn
              </p>
            </div>
            
            <div className="projects__controls">
              <div className="projects__filter">
                <FiFilter className="projects__filter-icon" />
                <div className="projects__categories">
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      className={`projects__category ${filter === category.id ? 'projects__category--active' : ''}`}
                      onClick={() => handleFilterChange(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.label}
                      <span className="projects__category-count">{category.count}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="projects__view-toggle">
                <motion.button
                  className={`projects__view-btn ${viewMode === 'grid' ? 'projects__view-btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGrid />
                </motion.button>
                <motion.button
                  className={`projects__view-btn ${viewMode === 'list' ? 'projects__view-btn--active' : ''}`}
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiList />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={`projects__grid projects__grid--${viewMode}`} 
            key={`${filter}-${viewMode}`}
            layout
            style={{
              transformStyle: enable3D ? "preserve-3d" : undefined
            }}
          >
            <AnimatePresence initial={false}>
              {filteredProjects.map((project, index) => {
                return (
                  <motion.div
                    key={project.id}
                    className={`projects__item glass-card ${project.featured ? 'projects__item--featured' : ''}`}
                    variants={itemVariants}
                    initial={enable3D ? { opacity: 0, scale: 0.8, rotateX: -20, z: -100 } : { opacity: 0, scale: 0.98 }}
                    animate={enable3D ? { opacity: 1, scale: 1, rotateX: 0, z: 0 } : { opacity: 1, scale: 1 }}
                    exit={enable3D ? { opacity: 0, scale: 0.8, rotateX: 20, z: -100 } : { opacity: 0, scale: 0.98 }}
                    whileHover={enable3D ? {
                      y: -8,
                      rotateY: 3,
                      z: 15,
                      transition: { type: 'spring', stiffness: 200, damping: 25 }
                    } : {
                      y: -4,
                      transition: { type: 'spring', stiffness: 250, damping: 20 }
                    }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      transformStyle: enable3D ? "preserve-3d" : undefined,
                      rotateX: enable3D ? rotateX : 0,
                      rotateY: enable3D ? rotateY : 0
                    }}
                  >
                    <motion.div 
                      className="projects__item-image"
                      style={{
                        transform: enable3D ? `translateZ(20px)` : undefined
                      }}
                    >
                      <img src={project.image} alt={project.title} loading="lazy" />
                      
                      {/* Enhanced Status Badge */}
                      <motion.div 
                        className="projects__item-status"
                        style={{
                          transform: enable3D ? `translateZ(30px)` : undefined
                        }}
                      >
                        <span className={`projects__status-badge projects__status-badge--${project.status}`}>
                          {project.status === 'completed' ? 'Hoàn thành' : 'Đang phát triển'}
                        </span>
                        <motion.div
                          className="projects__complexity-badge"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {getComplexityIcon(project.complexity)}
                        </motion.div>
                      </motion.div>

                      {/* 3D Overlay with Enhanced Actions */}
                      <motion.div 
                        className="projects__item-overlay"
                        style={{
                          transform: enable3D ? `translateZ(40px)` : undefined
                        }}
                        initial={{ opacity: 0, z: -20 }}
                        whileHover={enable3D ? { opacity: 1, z: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="projects__item-actions">
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects__action-btn projects__action-btn--primary"
                            whileHover={{ 
                              scale: 1.1, 
                              rotateY: 10,
                              z: 10
                            }}
                            whileTap={{ scale: 0.9 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <FiEye />
                            <span>Demo</span>
                            <motion.div
                              className="projects__action-btn-glow"
                              animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects__action-btn projects__action-btn--secondary"
                            whileHover={{ 
                              scale: 1.1, 
                              rotateY: -10,
                              z: 10
                            }}
                            whileTap={{ scale: 0.9 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <FiGithub />
                            <span>Code</span>
                          </motion.a>
                        </div>

                        {/* Performance Indicator */}
            <motion.div
                          className="projects__performance-indicator"
                          style={{
              transform: enable3D ? `translateZ(10px)` : undefined
                          }}
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <div className="projects__performance-circle">
                            <span>{project.performance}%</span>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Enhanced Sparkles with 3D Effect */}
                      <AnimatePresence>
                        {hoveredProject === project.id && !shouldReduceMotion && enable3D && (
                          <motion.div
                            className="projects__item-sparkles"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="projects__sparkle"
                                animate={{
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                  rotateZ: [0, 360],
                                  z: [0, 20, 0]
                                }}
                                transition={{
                                  duration: 2 + i * 0.1,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: "easeInOut"
                                }}
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  background: `hsl(${Math.random() * 360}, 70%, 60%)`
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 3D Morphing Border */}
                      <motion.div
                        className="projects__item-border"
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                          rotateZ: hoveredProject === project.id ? [0, 360] : 0,
                          scale: hoveredProject === project.id ? [1, 1.02, 1] : 1
                        }}
                        transition={{
                          rotateZ: { duration: 4, repeat: Infinity, ease: "linear" },
                          opacity: { duration: 0.3 },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      />
                    </motion.div>

                    <motion.div 
                      className="projects__item-content"
                      style={{
                        transform: enable3D ? `translateZ(15px)` : undefined,
                        transformStyle: enable3D ? "preserve-3d" : undefined
                      }}
                    >
                      <motion.div 
                        className="projects__item-header"
                        style={{
                          transform: enable3D ? `translateZ(5px)` : undefined
                        }}
                      >
                        <div className="projects__item-title-section">
                          <h3 className="projects__item-title">{project.title}</h3>
                          <motion.span 
                            className="projects__item-year"
                            animate={{
                              color: ['var(--text-tertiary)', 'var(--primary-light)', 'var(--text-tertiary)']
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {project.year}
                          </motion.span>
                        </div>
                        <div className="projects__item-links">
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects__link"
                            whileHover={enable3D ? { 
                              scale: 1.3, 
                              rotate: 15,
                              z: 10
                            } : { scale: 1.08 }}
                            whileTap={{ scale: 0.8 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <FiExternalLink />
                            <motion.div
                              className="projects__link-glow"
                              animate={{
                                opacity: [0, 0.8, 0],
                                scale: [1, 1.5, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects__link"
                            whileHover={enable3D ? { 
                              scale: 1.3, 
                              rotate: -15,
                              z: 10
                            } : { scale: 1.08 }}
                            whileTap={{ scale: 0.8 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <FiGithub />
                          </motion.a>
                        </div>
                      </motion.div>

                      <motion.p 
                        className="projects__item-description"
                        style={{
                          transform: enable3D ? `translateZ(3px)` : undefined
                        }}
                      >
                        {project.description}
                      </motion.p>

                      <motion.div 
                        className="projects__item-technologies"
                        style={{
                          transform: enable3D ? `translateZ(8px)` : undefined,
                          transformStyle: enable3D ? "preserve-3d" : undefined
                        }}
                      >
                        {project.technologies.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            className="projects__tech-tag"
                            whileHover={enable3D ? { 
                              scale: 1.15,
                              rotateY: 10,
                              z: 5,
                              transition: { type: 'spring', stiffness: 400 }
                            } : { scale: 1.08, transition: { type: 'spring', stiffness: 350 } }}
                            style={{
                              transformStyle: "preserve-3d"
                            }}
                            animate={{
                              boxShadow: [
                                '0 2px 8px rgba(99, 102, 241, 0.1)',
                                '0 4px 16px rgba(99, 102, 241, 0.3)',
                                '0 2px 8px rgba(99, 102, 241, 0.1)'
                              ]
                            }}
                            transition={{
                              duration: 2 + i * 0.2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {tech}
                            <motion.div
                              className="projects__tech-tag-shine"
                              animate={{
                                x: ['-100%', '100%']
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                              }}
                            />
                          </motion.span>
                        ))}
                      </motion.div>

                      {project.featured && (
            <motion.div 
                          className="projects__featured-badge"
                          style={{
              transform: enable3D ? `translateZ(12px)` : undefined
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                            rotateZ: [0, 2, -2, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.span
                            animate={{
                              textShadow: [
                                '0 0 5px rgba(255, 215, 0, 0.5)',
                                '0 0 15px rgba(255, 215, 0, 0.8)',
                                '0 0 5px rgba(255, 215, 0, 0.5)'
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            ⭐ Dự án nổi bật
                          </motion.span>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                className="projects__no-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Không có dự án phù hợp</h3>
                <p>Hãy chọn danh mục khác.</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div className="projects__cta" variants={itemVariants}>
            <div className="projects__cta-content">
              <h3>Bạn có ý tưởng thú vị?</h3>
              <p>Hãy cùng nhau biến ý tưởng của bạn thành hiện thực với công nghệ hiện đại nhất!</p>
              <div className="projects__cta-actions">
                <motion.a 
                  href="#contact" 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bắt Đầu Dự Án
                </motion.a>
                <motion.a 
                  href="#testimonials" 
                  className="btn btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xem Đánh Giá
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
