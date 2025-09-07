import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, 
  FaGitAlt, FaDocker, FaAws, FaFigma 
} from 'react-icons/fa'
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, 
  SiPostgresql, SiRedis, SiGraphql, SiJest 
} from 'react-icons/si'
import './Skills.scss'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', icon: FaReact, level: 95, color: '#61DAFB' },
        { name: 'JavaScript', icon: FaJsSquare, level: 90, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
        { name: 'HTML5', icon: FaHtml5, level: 95, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, level: 90, color: '#1572B6' },
        { name: 'Next.js', icon: SiNextdotjs, level: 80, color: '#000000' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: '#06B6D4' }
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 85, color: '#339933' },
        { name: 'Python', icon: FaPython, level: 80, color: '#3776AB' },
        { name: 'MongoDB', icon: SiMongodb, level: 85, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80, color: '#336791' },
        { name: 'GraphQL', icon: SiGraphql, level: 75, color: '#E10098' },
        { name: 'Redis', icon: SiRedis, level: 70, color: '#DC382D' }
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032' },
        { name: 'Docker', icon: FaDocker, level: 75, color: '#2496ED' },
        { name: 'AWS', icon: FaAws, level: 70, color: '#FF9900' },
        { name: 'Jest', icon: SiJest, level: 80, color: '#C21325' },
        { name: 'Figma', icon: FaFigma, level: 85, color: '#F24E1E' }
      ]
    }
  ]

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

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          ref={ref}
          className="skills__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <h2>Kỹ Năng</h2>
            <p>Các công nghệ và công cụ tôi sử dụng để tạo ra những sản phẩm tuyệt vời</p>
          </motion.div>

          <div className="skills__categories">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="skills__category card"
                variants={itemVariants}
              >
                <h3 className="skills__category-title">{category.title}</h3>
                <div className="skills__list">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon
                    return (
                      <motion.div
                        key={skillIndex}
                        className="skills__item"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="skills__item-header">
                          <div className="skills__item-info">
                            <IconComponent 
                              className="skills__item-icon" 
                              style={{ color: skill.color }} 
                            />
                            <span className="skills__item-name">{skill.name}</span>
                          </div>
                          <span className="skills__item-level">{skill.level}%</span>
                        </div>
                        <div className="skills__item-progress">
                          <motion.div
                            className="skills__item-bar"
                            style={{ 
                              backgroundColor: skill.color,
                              '--skill-color': skill.color 
                            }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ delay: 0.5 + skillIndex * 0.1, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="skills__summary" variants={itemVariants}>
            <div className="skills__summary-content">
              <h3>Tóm Tắt Kỹ Năng</h3>
              <p>
                Với kinh nghiệm phong phú trong phát triển web, tôi có khả năng xây dựng 
                các ứng dụng web từ frontend đến backend. Tôi không ngừng cập nhật kiến thức 
                về các công nghệ mới và luôn sẵn sàng thích ứng với yêu cầu dự án.
              </p>
              <div className="skills__expertise">
                <div className="skills__expertise-item">
                  <span className="skills__expertise-label">Chuyên Môn Chính:</span>
                  <span className="skills__expertise-value">Full Stack Development</span>
                </div>
                <div className="skills__expertise-item">
                  <span className="skills__expertise-label">Kinh Nghiệm:</span>
                  <span className="skills__expertise-value">3+ Năm</span>
                </div>
                <div className="skills__expertise-item">
                  <span className="skills__expertise-label">Dự Án:</span>
                  <span className="skills__expertise-value">50+ Completed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
