import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiCalendar, 
  FiMapPin, 
  FiCode,
  FiTrendingUp,
  FiZap,
  FiStar,
  FiArrowRight
} from 'react-icons/fi'
import './Experience.scss'

function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      id: 1,
      title: 'Web Developer',
      company: 'Freelance Projects',
      period: '2023 - Hiện tại',
      location: 'Hậu Giang, Việt Nam',
      description: 'Phát triển các website và ứng dụng web sử dụng công nghệ hiện đại. Chuyên về React, java và các framework JavaScript. Tham gia xây dựng các dự án từ nhỏ đến trung bình.',
      achievements: [
        'Hoàn thành 10+ dự án web thành công',
        'Thực hiện React, Java và SQL Server',
        'Triển khai website với responsive design 100%'
      ],
      technologies: ['React', 'java', 'JavaScript', 'HTML5', 'CSS3', 'SQL Server'],
      icon: FiCode,
      color: '#6366f1',
      bgColor: '#f0f9ff'
    },
    {
      id: 2,
      title: 'Java Desktop Developer',
      company: 'Personal Projects',
      period: '2023 - 2024',
      location: 'Hậu Giang, Việt Nam',
      description: 'Phát triển các ứng dụng desktop bằng Java Swing. Tạo ra các phần mềm quản lý và ứng dụng tiện ích với giao diện người dùng thân thiện và hiệu quả.',
      achievements: [
        'Phát triển 5+ ứng dụng Java Swing hoàn chỉnh',
        'Thiết kế UI/UX cho desktop applications',
        'Tích hợp database với ứng dụng Java'
      ],
      technologies: ['Java', 'Swing', 'MySQL', 'NetBeans', 'Eclipse'],
      icon: FiTrendingUp,
      color: '#ec4899',
      bgColor: '#fdf2f8'
    },
    {
      id: 3,
      title: 'Frontend Foundation',
      company: 'Self-taught Learning',
      period: '2022 - 2023',
      location: 'Hậu Giang, Việt Nam',
      description: 'Bắt đầu hành trình lập trình với việc tìm hiểu HTML, CSS và JavaScript. Xây dựng nền tảng vững chắc về frontend development và responsive web design.',
      achievements: [
        'Nắm vững HTML5, CSS3 và JavaScript ES6+',
        'Tạo ra các website static responsive',
        'Hiểu sâu về DOM manipulation và Events'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
      icon: FiZap,
      color: '#06b6d4',
      bgColor: '#f0fdfa'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          ref={ref}
          className="experience__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div 
            className="experience__header"
            variants={cardVariants}
          >
            <span className="experience__subtitle">Hành trình học tập và phát triển</span>
            <h2 className="experience__title">Kinh Nghiệm & Học Tập</h2>
            <p className="experience__description">
              Từ HTML/CSS/JS cơ bản đến Java Swing và Web Development hiện đại
            </p>
          </motion.div>

          {/* Experience Cards */}
          <div className="experience__grid">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="experience__card"
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Card Header */}
                <div className="experience__card-header">
                  <div className="experience__icon-wrapper" style={{ backgroundColor: exp.bgColor }}>
                    <exp.icon 
                      className="experience__icon"
                      style={{ color: exp.color }}
                    />
                  </div>
                  <div className="experience__period">
                    <FiCalendar className="experience__period-icon" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Job Info */}
                <div className="experience__job-info">
                  <h3 className="experience__job-title">{exp.title}</h3>
                  <div 
                    className="experience__company"
                    style={{ backgroundColor: exp.color }}
                  >
                    {exp.company}
                  </div>
                  <div className="experience__location">
                    <FiMapPin className="experience__location-icon" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="experience__job-description">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="experience__achievements">
                  <h4 className="experience__achievements-title">
                    <FiStar className="experience__achievements-icon" />
                    Thành tựu chính
                  </h4>
                  <ul className="experience__achievements-list">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="experience__achievement">
                        <FiArrowRight className="experience__achievement-icon" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="experience__technologies">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="experience__tech-tag"
                      style={{ borderColor: exp.color }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
