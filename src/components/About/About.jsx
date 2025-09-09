import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { 
  FiCode, FiZap, FiActivity,
  FiGithub, FiLinkedin, FiMail, FiDownload, FiEye
} from "react-icons/fi";

import "./About.scss";

// Optimized GitHub data hook
const useGithubData = () => {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let ignore = false;
    const ctrl = new AbortController();

    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/nhdinhdev03", {
            signal: ctrl.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            "https://api.github.com/users/nhdinhdev03/repos?per_page=6&sort=updated",
            {
              signal: ctrl.signal,
              headers: { Accept: "application/vnd.github+json" },
            }
          ),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error("Failed to fetch");

        const [profile, repos] = await Promise.all([
          profileRes.json(),
          reposRes.json(),
        ]);

        if (!ignore) {
          setData({
            profile,
            repos: Array.isArray(repos) ? repos.filter((r) => !r.archived) : [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!ignore && error.name !== "AbortError") {
          setData((prev) => ({ ...prev, loading: false, error }));
        }
      }
    }

    fetchData();
    return () => {
      ignore = true;
      ctrl.abort();
    };
  }, []);

  return data;
};

const ProfileHero = ({ profile, light }) => {
  const [particles, setParticles] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const heroRef = useRef(null)
  
  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 })

  // Initialize particles
  useEffect(() => {
    const particleCount = 12
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.4 + 0.1,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  // Mouse move handler
  const handleMouseMove = (event) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(event.clientX - centerX)
      mouseY.set(event.clientY - centerY)
    }
  }

  return (
    <motion.section 
      ref={heroRef}
      className="profile-hero glass-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Animated Particles */}
      <div className="profile-hero__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="profile-hero__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="profile-hero__content">
        <motion.div 
          className="profile-image"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div
            className="profile-image__container"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <img src={profile?.avatar_url || "/api/placeholder/300/300"} alt="Profile" />
            <motion.div
              className="profile-image__glow"
              animate={{
                opacity: isHovered ? [0.3, 0.7, 0.3] : [0.1, 0.3, 0.1],
                scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="profile-image__ring"
              animate={{
                rotate: [0, 360],
                scale: isHovered ? [1, 1.05, 1] : [1, 1.02, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            />
          </motion.div>
          
          <motion.div className="profile-status">
            <motion.span 
              className={`status-badge ${light ? "light-mode" : "dark-mode"}`}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.3)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 10px rgba(16, 185, 129, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <motion.div
                className="status-badge__dot"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              {light ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </motion.span>
          </motion.div>
        </motion.div>
        
    <div className="profile-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <motion.span 
              className="name-highlight"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'linear-gradient(90deg, var(--gradient-primary), var(--gradient-secondary), var(--gradient-primary))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
          {profile?.name || "Nguyen Hoang Dinh"}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            <FiCode className="title-icon" />
            Lập Trình Viên & Kỹ Thuật Phần Mềm
          </motion.p>
          
          <motion.div 
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            <motion.p>
              <motion.span 
                className="highlight-primary"
                whileHover={{ scale: 1.05, color: 'var(--primary-light)' }}
              >
          Biến ý tưởng thành những sản phẩm tinh xảo
              </motion.span>
        {" — chuyên về "}
              <motion.span 
                className="highlight-secondary"
                whileHover={{ scale: 1.05, color: 'var(--secondary-light)' }}
              >
          phát triển ứng dụng web full-stack
              </motion.span>
        {" và "}
              <motion.span 
                className="highlight-accent"
                whileHover={{ scale: 1.05, color: 'var(--accent-light)' }}
              >
                tối ưu hóa hiệu suất hệ thống
              </motion.span>
              .
            </motion.p>
            
            <motion.p>
              <motion.span 
                className="highlight-primary"
                whileHover={{ scale: 1.05 }}
              >
                Đam mê học công nghệ mới
              </motion.span>
        {", thiết kế kiến trúc sạch và "}
              <motion.span 
                className="highlight-secondary"
                whileHover={{ scale: 1.05 }}
              >
          tối ưu hóa trải nghiệm người dùng
              </motion.span>
              .
            </motion.p>
            
            <motion.p>
              <motion.span 
                className="highlight-accent"
                whileHover={{ scale: 1.05 }}
              >
          Khi không lập trình, tôi khám phá thiết kế hệ thống
              </motion.span>
        {" và cải thiện kỹ năng DevOps. "}
        <span className="italic">
          {profile?.bio ||
            "Có kinh nghiệm với React, Node.js và công nghệ đám mây với tâm huyết về code sạch và có thể mở rộng."}
        </span>
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="profile-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <motion.span 
              className="badge badge-green"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiZap className="badge-icon" />
              Sẵn Sàng Làm Việc
            </motion.span>
            <motion.span 
              className="badge badge-blue"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiCode className="badge-icon" />
              Web Developer
            </motion.span>
            <motion.span 
              className="badge badge-orange"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiActivity className="badge-icon" />
              System Design
            </motion.span>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            className="profile-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          >
            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail />
              Liên hệ
            </motion.a>
            <motion.a
              href="/resume.pdf"
              className="btn btn-outline"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              <FiDownload />
              Tải CV
            </motion.a>
            <motion.a
              href="#projects"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEye />
              Xem dự án
            </motion.a>
          </motion.div>
      </div>
    </div>
    </motion.section>
  )
};

ProfileHero.propTypes = {
  profile: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};



// Contact Section
const ContactSection = ({ profile, light }) => (
  <motion.section 
    className="contact-section"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    whileHover={{ 
      scale: 1.01,
      transition: { type: 'spring', stiffness: 400 }
    }}
  >
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
    >
      Kết Nối Với Tôi
    </motion.h3>
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
    >
      Tôi luôn sẵn sàng thảo luận về những cơ hội mới và các dự án thú vị.
      Hãy liên hệ nếu bạn muốn hợp tác hoặc đơn giản chỉ muốn kết nối!
    </motion.p>
    <motion.div 
      className="contact-actions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
    >
      <motion.a
        href="mailto:nhdinhdev03@gmail.com"
        className="btn btn-primary"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMail style={{ marginRight: '8px' }} />
        Email
      </motion.a>
      <motion.a
        href={profile?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiGithub style={{ marginRight: '8px' }} />
        GitHub
      </motion.a>
      <motion.a
        href="https://linkedin.com/in/nhdinhdev03"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiLinkedin style={{ marginRight: '8px' }} />
        LinkedIn
      </motion.a>
    </motion.div>
    <motion.div 
      className="theme-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <motion.div 
        className="theme-status"
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {light
          ? "☀️ Chế Độ Sáng Đang Hoạt Động"
          : "🌙 Chế Độ Tối Đang Hoạt Động"}
      </motion.div>
    </motion.div>
  </motion.section>
);

// Main About Component
const About = () => {
  const { profile } = useGithubData();
  const [particles, setParticles] = useState([])
  const aboutRef = useRef(null)
  const light =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "light";

  // Reveal-on-scroll like other sections
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Initialize background particles
  useEffect(() => {
    const particleCount = 15
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.2 + 0.05,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <section id="about" className="about section" ref={aboutRef}>
      {/* Animated Background Particles */}
      <div className="about__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="about__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none',
              filter: 'blur(1px)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <motion.div
          ref={ref}
          className="section-title"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            style={{
              background: 'linear-gradient(90deg, var(--text-primary), var(--primary-light), var(--secondary-light), var(--text-primary))',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            Giới Thiệu
          </motion.h2>
          <motion.p variants={itemVariants}>
            Giới thiệu chi tiết về kinh nghiệm và hành trình phát triển chuyên môn.
          </motion.p>
        </motion.div>

        <motion.div
          className={`about-page ${light ? "light" : ""}`}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <ProfileHero profile={profile} light={light} />
          </motion.div>
          
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <ContactSection profile={profile} light={light} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

// PropTypes definitions - fix existing warnings

ContactSection.propTypes = {
  profile: PropTypes.shape({
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};
