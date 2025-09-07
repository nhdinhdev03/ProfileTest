import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar, FiMessageCircle } from 'react-icons/fi'
import './Testimonials.scss'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Product Manager",
      company: "TechCorp Inc.",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "Làm việc với Professional Developer là một trải nghiệm tuyệt vời. Anh ấy không chỉ có kỹ năng kỹ thuật xuất sắc mà còn hiểu rõ nhu cầu business. Dự án được hoàn thành đúng hạn và vượt mong đợi.",
      project: "E-commerce Platform"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      company: "StartupXYZ",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "Tôi đã làm việc với nhiều developers, nhưng ít ai có thể kết hợp được kỹ năng frontend và backend như Professional Developer. Code clean, performance tốt, và luôn sẵn sàng học hỏi công nghệ mới.",
      project: "SaaS Dashboard"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "UI/UX Designer",
      company: "DesignStudio",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "Collaboration với Professional Developer rất smooth. Anh ấy hiểu design và có thể implement các ý tưởng phức tạp một cách hoàn hảo. Attention to detail rất tốt!",
      project: "Mobile App UI"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Founder",
      company: "InnovateLab",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "Professional Developer đã giúp chúng tôi xây dựng MVP từ con số 0. Không chỉ code tốt mà còn đưa ra nhiều suggestions hữu ích cho product. Highly recommended!",
      project: "Fintech Platform"
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Marketing Director",
      company: "GrowthCo",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "Website mới của chúng tôi không chỉ đẹp mà còn load nhanh và SEO-friendly. Professional Developer đã tối ưu mọi thứ một cách hoàn hảo. Conversion rate tăng 40% sau khi launch!",
      project: "Corporate Website"
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__container">
        <motion.div
          className="testimonials__header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="testimonials__title-section" variants={itemVariants}>
            <h2 className="testimonials__title">
              <span className="testimonials__title-text">Client</span>
              <span className="testimonials__title-highlight">Testimonials</span>
            </h2>
            <p className="testimonials__description">
              Những phản hồi từ khách hàng và đối tác đã làm việc cùng tôi
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="testimonials__carousel"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait" custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  nextTestimonial()
                } else if (swipe > swipeConfidenceThreshold) {
                  prevTestimonial()
                }
              }}
              className="testimonials__slide"
            >
              <div className="testimonials__card glass-card">
                <div className="testimonials__quote-icon">
                  <FiMessageCircle />
                </div>
                
                <div className="testimonials__rating">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                    >
                      <FiStar className="testimonials__star" />
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  className="testimonials__text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonials[currentIndex].text}"
                </motion.p>

                <motion.div 
                  className="testimonials__author"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="testimonials__avatar">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name}
                    />
                  </div>
                  <div className="testimonials__author-info">
                    <h4 className="testimonials__author-name">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="testimonials__author-position">
                      {testimonials[currentIndex].position}
                    </p>
                    <p className="testimonials__author-company">
                      {testimonials[currentIndex].company}
                    </p>
                    <span className="testimonials__project">
                      Project: {testimonials[currentIndex].project}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials__controls">
            <motion.button
              className="testimonials__nav testimonials__nav--prev"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft />
            </motion.button>

            <div className="testimonials__dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`testimonials__dot ${index === currentIndex ? 'testimonials__dot--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              className="testimonials__nav testimonials__nav--next"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <FiChevronRight />
            </motion.button>
          </div>

          <div className="testimonials__progress">
            <motion.div
              className="testimonials__progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="testimonials__stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="testimonials__stat" variants={itemVariants}>
            <div className="testimonials__stat-number">50+</div>
            <div className="testimonials__stat-label">Happy Clients</div>
          </motion.div>
          <motion.div className="testimonials__stat" variants={itemVariants}>
            <div className="testimonials__stat-number">100+</div>
            <div className="testimonials__stat-label">Projects Completed</div>
          </motion.div>
          <motion.div className="testimonials__stat" variants={itemVariants}>
            <div className="testimonials__stat-number">5.0</div>
            <div className="testimonials__stat-label">Average Rating</div>
          </motion.div>
          <motion.div className="testimonials__stat" variants={itemVariants}>
            <div className="testimonials__stat-number">3+</div>
            <div className="testimonials__stat-label">Years Experience</div>
          </motion.div>
        </motion.div>
      </div>

      <div className="testimonials__background">
        <div className="testimonials__background-circle testimonials__background-circle--1"></div>
        <div className="testimonials__background-circle testimonials__background-circle--2"></div>
      </div>
    </section>
  )
}

export default Testimonials
