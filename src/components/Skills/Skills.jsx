import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Skills.scss'
import TechMarquee from '../TechMarquee/TechMarquee'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Grid skills section removed per request; keeping title + TechMarquee only

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

          {/* Slideshow + Marquee of tech like TechMarquee, compact and without header */}
          <div className="skills__marquee-wrapper">
            <TechMarquee showHeader={false} compact direction="ltr" />
          </div>

          {/* Grid skills removed */}

   
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
