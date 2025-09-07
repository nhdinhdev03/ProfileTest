import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi'
import './Contact.scss'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'developer@example.com',
      link: 'mailto:developer@example.com'
    },
    {
      icon: FiPhone,
      title: 'Điện thoại',
      value: '+84 123 456 789',
      link: 'tel:+84123456789'
    },
    {
      icon: FiMapPin,
      title: 'Địa chỉ',
      value: 'Hà Nội, Việt Nam',
      link: 'https://maps.google.com'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.')
    }, 2000)
  }

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
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <h2>Liên Hệ</h2>
            <p>Hãy kết nối với tôi để thảo luận về dự án tiếp theo của bạn</p>
          </motion.div>

          <div className="contact__wrapper">
            <motion.div className="contact__info" variants={itemVariants}>
              <h3>Thông Tin Liên Hệ</h3>
              <p>
                Tôi luôn sẵn sàng lắng nghe những ý tưởng mới và cơ hội hợp tác thú vị. 
                Hãy liên hệ với tôi qua các kênh bên dưới!
              </p>

              <div className="contact__info-list">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="contact__info-item"
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <div className="contact__info-icon">
                        <IconComponent />
                      </div>
                      <div className="contact__info-content">
                        <span className="contact__info-title">{info.title}</span>
                        <span className="contact__info-value">{info.value}</span>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              <div className="contact__availability">
                <h4>Tình Trạng</h4>
                <div className="contact__status">
                  <div className="contact__status-dot"></div>
                  <span>Sẵn sàng cho dự án mới</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="contact__form-wrapper" variants={itemVariants}>
              <form className="contact__form card" onSubmit={handleSubmit}>
                <h3>Gửi Tin Nhắn</h3>
                
                <div className="contact__form-grid">
                  <div className="contact__form-group">
                    <label htmlFor="name">
                      <FiUser /> Tên của bạn
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="email">
                      <FiMail /> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label htmlFor="subject">
                    <FiMessageSquare /> Chủ đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Chủ đề tin nhắn"
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message">
                    <FiMessageSquare /> Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hãy chia sẻ chi tiết về dự án hoặc ý tưởng của bạn..."
                    rows={6}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={`btn btn-primary contact__form-submit ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Gửi Tin Nhắn
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
