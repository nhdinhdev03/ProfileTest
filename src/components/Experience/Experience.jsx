import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import './Experience.scss'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovation Corp',
      period: '2022 - Hiện tại',
      location: 'Hà Nội, Việt Nam',
      description: 'Phát triển và duy trì các ứng dụng web quy mô lớn sử dụng React, Node.js và MongoDB. Quản lý team 5 developers và tham gia vào việc thiết kế kiến trúc hệ thống.',
      achievements: [
        'Cải thiện hiệu suất ứng dụng lên 40%',
        'Triển khai CI/CD pipeline giảm thời gian deploy 60%',
        'Mentor cho 3 junior developers'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd',
      period: '2021 - 2022',
      location: 'Hà Nội, Việt Nam',
      description: 'Phát triển các tính năng mới cho nền tảng e-commerce, tối ưu hóa database và triển khai các API RESTful. Làm việc trực tiếp với khách hàng để hiểu yêu cầu.',
      achievements: [
        'Phát triển 15+ tính năng mới',
        'Tối ưu database queries giảm 50% thời gian load',
        'Tăng conversion rate 25% thông qua UX improvements'
      ],
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Redis']
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Hub',
      period: '2020 - 2021',
      location: 'Hà Nội, Việt Nam',
      description: 'Tham gia phát triển các ứng dụng web responsive, tương tác với team design để implement UI/UX designs và optimize performance.',
      achievements: [
        'Xây dựng component library được sử dụng trong 5+ projects',
        'Cải thiện Core Web Vitals scores lên 90+',
        'Implement responsive design cho 10+ landing pages'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Jest']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <motion.div
          ref={ref}
          className="experience__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <h2>Kinh Nghiệm Làm Việc</h2>
            <p>Hành trình phát triển chuyên môn và những thành tựu đã đạt được</p>
          </motion.div>

          <div className="experience__timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience__item"
                variants={itemVariants}
              >
                <div className="experience__marker">
                  <FiBriefcase />
                </div>
                
                <div className="experience__content-card card">
                  <div className="experience__header">
                    <h3 className="experience__title">{exp.title}</h3>
                    <div className="experience__meta">
                      <div className="experience__company">{exp.company}</div>
                      <div className="experience__details">
                        <span className="experience__period">
                          <FiCalendar /> {exp.period}
                        </span>
                        <span className="experience__location">
                          <FiMapPin /> {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="experience__description">{exp.description}</p>

                  <div className="experience__achievements">
                    <h4>Thành tựu chính:</h4>
                    <ul>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="experience__technologies">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="experience__tech-tag">{tech}</span>
                    ))}
                  </div>
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
