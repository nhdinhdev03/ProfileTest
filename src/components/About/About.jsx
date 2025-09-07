import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiUsers, FiCoffee, FiHeart, FiTarget, FiTrendingUp } from 'react-icons/fi'
import './About.scss'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    { icon: FiAward, number: '3+', label: 'Năm Kinh Nghiệm' },
    { icon: FiUsers, number: '50+', label: 'Dự Án Hoàn Thành' },
    { icon: FiCoffee, number: '1000+', label: 'Cốc Cà Phê' },
    { icon: FiHeart, number: '100%', label: 'Tình Yêu Code' }
  ]

  const values = [
    {
      icon: FiTarget,
      title: 'Tập Trung Vào Mục Tiêu',
      description: 'Luôn hướng tới việc tạo ra những sản phẩm có giá trị thực sự cho người dùng và doanh nghiệp.'
    },
    {
      icon: FiTrendingUp,
      title: 'Học Hỏi Không Ngừng',
      description: 'Cập nhật liên tục với công nghệ mới và xu hướng phát triển web hiện đại.'
    },
    {
      icon: FiUsers,
      title: 'Làm Việc Nhóm',
      description: 'Có khả năng làm việc hiệu quả trong môi trường nhóm và giao tiếp tốt với stakeholders.'
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
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          ref={ref}
          className="about__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <h2>Về Tôi</h2>
            <p>Tìm hiểu thêm về hành trình và đam mê của tôi trong lập trình</p>
          </motion.div>

          <div className="about__main">
            <motion.div className="about__info" variants={itemVariants}>
              <div className="about__text">
                <motion.p variants={itemVariants}>
                  Xin chào! Tôi là một Full Stack Developer đam mê tạo ra những trải nghiệm web 
                  tuyệt vời. Với hơn 3 năm kinh nghiệm trong ngành, tôi đã có cơ hội làm việc 
                  với nhiều công nghệ khác nhau và tham gia vào các dự án đa dạng.
                </motion.p>
                
                <motion.p variants={itemVariants}>
                  Tôi bắt đầu hành trình lập trình từ năm 2020 và ngay từ những dòng code đầu tiên, 
                  tôi đã biết rằng đây chính là con đường mà mình muốn theo đuổi. Từ việc tạo ra 
                  những trang web đơn giản đến phát triển các ứng dụng web phức tạp, tôi luôn 
                  cố gắng học hỏi và cải thiện kỹ năng mỗi ngày.
                </motion.p>

                <motion.p variants={itemVariants}>
                  Hiện tại, tôi chuyên về React, Node.js và các công nghệ web hiện đại. 
                  Tôi yêu thích việc biến những ý tưởng thành hiện thực và tạo ra những 
                  sản phẩm không chỉ đẹp mắt mà còn hoạt động một cách mượt mà và hiệu quả.
                </motion.p>

                <motion.div className="about__highlights" variants={itemVariants}>
                  <h4>Những điều tôi yêu thích:</h4>
                  <ul>
                    <li>🚀 Học hỏi công nghệ mới</li>
                    <li>💡 Giải quyết vấn đề phức tạp</li>
                    <li>🎨 Thiết kế UI/UX sáng tạo</li>
                    <li>🌱 Chia sẻ kiến thức với cộng đồng</li>
                    <li>☕ Và tất nhiên... cà phê!</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="about__image" variants={itemVariants}>
              <div className="about__image-wrapper">
                <img 
                  src="/api/placeholder/400/500" 
                  alt="About Me" 
                />
                <div className="about__image-overlay">
                  <div className="about__image-text">
                    <span>Passionate Developer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="about__stats" variants={itemVariants}>
            <div className="about__stats-grid">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    className="about__stat-item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="about__stat-icon">
                      <IconComponent />
                    </div>
                    <div className="about__stat-content">
                      <span className="about__stat-number">{stat.number}</span>
                      <span className="about__stat-label">{stat.label}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="about__values" variants={itemVariants}>
            <h3 className="about__values-title">Giá Trị Cốt Lõi</h3>
            <div className="about__values-grid">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <motion.div
                    key={index}
                    className="about__value-item card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="about__value-icon">
                      <IconComponent />
                    </div>
                    <h4 className="about__value-title">{value.title}</h4>
                    <p className="about__value-description">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="about__cta" variants={itemVariants}>
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hãy Cùng Hợp Tác!
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
