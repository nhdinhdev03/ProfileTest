import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiExternalLink, FiGithub, FiEye, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import useSaveScrollPosition from 'hooks/useSaveScrollPosition';
import './Projects.scss';

function Projects() {
  const { t, i18n } = useTranslation();
  
  // Sử dụng hook lưu và khôi phục vị trí cuộn
  useSaveScrollPosition();
  
  const [filter, setFilter] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Helper function to get localized description
  const getLocalizedDescription = (project) => {
    return i18n.language === 'en' ? project.descriptionEn : project.description;
  };

  // Projects data - stable and simple
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Nền tảng thương mại điện tử hoàn chỉnh với tính năng thanh toán, quản lý đơn hàng và dashboard admin.',
      descriptionEn: 'Complete e-commerce platform with payment features, order management and admin dashboard.',
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
      descriptionEn: 'Task management application with real-time collaboration and notification system.',
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
      descriptionEn: 'Responsive portfolio website with beautiful animations and optimized performance.',
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
      descriptionEn: 'Weather dashboard with interactive charts and 7-day forecast using API.',
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
      descriptionEn: 'Social media application with real-time chat and media upload features.',
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
      description: 'Nền tảng học tập trực tuyến với video streaming và quiz tương tác.',
      descriptionEn: 'Online learning platform with video streaming and interactive quizzes.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      category: 'fullstack',
      status: 'completed',
      year: '2023'
    }
  ];

  // Filter projects based on selected filter
  useEffect(() => {
    let filtered = projects;
    
    if (filter !== 'all') {
      if (filter === 'featured') {
        filtered = projects.filter(project => project.featured);
      } else {
        filtered = projects.filter(project => project.category === filter);
      }
    }
    
    setFilteredProjects(filtered);
  }, [filter]);

  // Filter options
  const filterOptions = [
    { 
      key: 'featured', 
      label: t('projects.filters.featured'), 
      count: projects.filter(p => p.featured).length 
    },
    { 
      key: 'all', 
      label: t('projects.filters.all'), 
      count: projects.length 
    },
    { 
      key: 'fullstack', 
      label: t('projects.filters.fullstack'), 
      count: projects.filter(p => p.category === 'fullstack').length 
    },
    { 
      key: 'frontend', 
      label: t('projects.filters.frontend'), 
      count: projects.filter(p => p.category === 'frontend').length 
    },
    { 
      key: 'mobile', 
      label: t('projects.filters.mobile'), 
      count: projects.filter(p => p.category === 'mobile').length 
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="projects"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        {/* Header */}
        <motion.div className="projects__header" variants={itemVariants}>
          <div className="projects__title-section">
            <h1 className="projects__title">
              {t('projects.title')}
            </h1>
            <p className="projects__subtitle">
              {t('projects.subtitle')}
            </p>
            <p className="projects__description">
              {t('projects.description')}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div className="projects__filters" variants={itemVariants}>
          <div className="projects__filter-group">
            <FiFilter className="projects__filter-icon" />
            {filterOptions.map(option => (
              <button
                key={option.key}
                className={`projects__filter-btn ${filter === option.key ? 'active' : ''}`}
                onClick={() => setFilter(option.key)}
              >
                {option.label}
                <span className="projects__filter-count">{option.count}</span>
              </button>
            ))}
          </div>

          <div className="projects__view-toggle">
            <button
              className={`projects__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title={t('projects.view_modes.grid')}
            >
              <FiGrid />
            </button>
            <button
              className={`projects__view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title={t('projects.view_modes.list')}
            >
              <FiList />
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className={`projects__grid ${viewMode === 'list' ? 'projects__grid--list' : ''}`}
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                className="projects__card"
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="projects__card-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="projects__card-overlay">
                    <div className="projects__card-actions">
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__action-btn"
                        title={t('projects.actions.view_demo')}
                      >
                        <FiEye />
                      </a>
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__action-btn"
                        title={t('projects.actions.view_code')}
                      >
                        <FiGithub />
                      </a>
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__action-btn"
                        title={t('projects.actions.visit_site')}
                      >
                        <FiExternalLink />
                      </a>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="projects__featured-badge">
                      {t('projects.featured_badge')}
                    </div>
                  )}
                </div>

                <div className="projects__card-content">
                  <div className="projects__card-meta">
                    <span className="projects__card-year">{project.year}</span>
                    <span className="projects__card-status projects__card-status--completed">
                      {project.status === 'completed' ? t('projects.status.completed') : t('projects.status.in_progress')}
                    </span>
                  </div>

                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__card-description">{getLocalizedDescription(project)}</p>

                  <div className="projects__card-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="projects__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="projects__empty"
            variants={itemVariants}
          >
            <p>{t('projects.no_projects')}</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default Projects;