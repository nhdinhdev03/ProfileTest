import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiEye, FiFilter, FiGrid, FiList } from 'react-icons/fi'
import './Projects.scss'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
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
      year: '2024'
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
      year: '2024'
    },
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
  ]

  const categories = [
    { id: 'all', label: 'Tất cả', count: projects.length },
    { id: 'featured', label: 'Nổi bật', count: projects.filter(p => p.featured).length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length }
  ]

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    return project.category === filter
  })

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
    <section id="projects" className="projects">
      <div className="projects__container">
        <motion.div
          ref={ref}
          className="projects__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="projects__header" variants={itemVariants}>
            <div className="projects__title-section">
              <h2 className="projects__title">
                <span className="projects__title-text">Dự Án</span>
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
                      onClick={() => setFilter(category.id)}
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

          <motion.div className={`projects__grid projects__grid--${viewMode}`} layout>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`projects__item glass-card ${project.featured ? 'projects__item--featured' : ''}`}
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    y: -10,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="projects__item-image">
                    <img src={project.image} alt={project.title} />
                    <div className="projects__item-status">
                      <span className={`projects__status-badge projects__status-badge--${project.status}`}>
                        {project.status === 'completed' ? 'Hoàn thành' : 'Đang phát triển'}
                      </span>
                    </div>
                    <div className="projects__item-overlay">
                      <div className="projects__item-actions">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__action-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiEye />
                          <span>Xem Demo</span>
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__action-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiGithub />
                          <span>Source Code</span>
                        </motion.a>
                      </div>
                    </div>
                    {hoveredProject === project.id && (
                      <motion.div
                        className="projects__item-sparkles"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="projects__sparkle"
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="projects__item-content">
                    <div className="projects__item-header">
                      <div className="projects__item-title-section">
                        <h3 className="projects__item-title">{project.title}</h3>
                        <span className="projects__item-year">{project.year}</span>
                      </div>
                      <div className="projects__item-links">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__link"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <FiExternalLink />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__link"
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <FiGithub />
                        </motion.a>
                      </div>
                    </div>

                    <p className="projects__item-description">{project.description}</p>

                    <div className="projects__item-technologies">
                      {project.technologies.map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className="projects__tech-tag"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {project.featured && (
                      <div className="projects__featured-badge">
                        <span>⭐ Dự án nổi bật</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
