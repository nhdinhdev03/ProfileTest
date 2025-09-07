import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiEye } from 'react-icons/fi'
import './Projects.scss'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Nền tảng thương mại điện tử hoàn chỉnh với tính năng thanh toán, quản lý đơn hàng và dashboard admin.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'Ứng dụng quản lý công việc với tính năng real-time collaboration và notification system.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Express.js', 'Socket.io', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      title: 'Portfolio Website',
      description: 'Website portfolio responsive với animations đẹp mắt và performance tối ưu.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Framer Motion', 'SCSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      title: 'Weather Dashboard',
      description: 'Dashboard thời tiết với charts tương tác và dự báo 7 ngày sử dụng API.',
      image: '/api/placeholder/600/400',
      technologies: ['TypeScript', 'Chart.js', 'Weather API'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      title: 'Social Media App',
      description: 'Ứng dụng mạng xã hội với tính năng chat real-time và upload media.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      title: 'Learning Platform',
      description: 'Nền tảng học trực tuyến với video streaming và quiz system.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Prisma', 'AWS S3'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    }
  ]

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
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          ref={ref}
          className="projects__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <h2>Dự Án</h2>
            <p>Những sản phẩm tôi đã tạo ra với đam mê và kỹ năng chuyên môn</p>
          </motion.div>

          <div className="projects__grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`projects__item card ${project.featured ? 'projects__item--featured' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="projects__item-image">
                  <img src={project.image} alt={project.title} />
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
                </div>

                <div className="projects__item-content">
                  <div className="projects__item-header">
                    <h3 className="projects__item-title">{project.title}</h3>
                    <div className="projects__item-links">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        <FiExternalLink />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        <FiGithub />
                      </a>
                    </div>
                  </div>

                  <p className="projects__item-description">{project.description}</p>

                  <div className="projects__item-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="projects__tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="projects__cta" variants={itemVariants}>
            <p>Bạn có ý tưởng thú vị? Hãy cùng thực hiện nó!</p>
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bắt Đầu Dự Án
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
