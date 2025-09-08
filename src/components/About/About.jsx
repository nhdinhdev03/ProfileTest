import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { 
  FiUser, FiMapPin, FiCalendar, FiTrendingUp, FiAward, FiCode,
  FiStar, FiZap, FiTarget, FiActivity, FiBookOpen, FiHeart,
  FiGithub, FiLinkedin, FiMail, FiDownload, FiEye, FiCoffee
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
          JavaScript/TypeScript front-end
              </motion.span>
        {" và "}
              <motion.span 
                className="highlight-accent"
                whileHover={{ scale: 1.05, color: 'var(--accent-light)' }}
              >
                phát triển API back-end
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
              Full-Stack Developer
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

// Enhanced Quick Stats Section
const QuickStats = ({ repos, profile }) => {
  const [animatedNumbers, setAnimatedNumbers] = useState({})
  
  const stats = [
    { 
      key: 'projects',
      number: repos?.length || 0, 
      label: "Dự Án", 
      icon: FiTarget,
      color: '#6366f1',
      description: 'Dự án đã hoàn thành'
    },
    { 
      key: 'followers',
      number: profile?.followers || 0, 
      label: "Người Theo Dõi", 
      icon: FiHeart,
      color: '#ec4899',
      description: 'Cộng đồng theo dõi'
    },
    { 
      key: 'following',
      number: profile?.following || 0, 
      label: "Đang Theo Dõi", 
      icon: FiUser,
      color: '#10b981',
      description: 'Kết nối chuyên nghiệp'
    },
    { 
      key: 'repos',
      number: profile?.public_repos || 0, 
      label: "Kho Mã Nguồn", 
      icon: FiGithub,
      color: '#f59e0b',
      description: 'Repository công khai'
    },
  ];

  // Animate numbers when component mounts
  useEffect(() => {
    stats.forEach((stat, index) => {
      setTimeout(() => {
        let current = 0
        const increment = stat.number / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            current = stat.number
            clearInterval(timer)
          }
          setAnimatedNumbers(prev => ({ ...prev, [stat.key]: Math.floor(current) }))
        }, 30)
      }, index * 200)
    })
  }, [stats])

  return (
    <section className="quick-stats">
      <motion.div 
        className="quick-stats__header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FiTrendingUp className="quick-stats__header-icon" />
        <h3>Thống Kê Nhanh</h3>
      </motion.div>
      
      <div className="quick-stats__grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div 
              key={index} 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.1 + index * 0.1, 
                type: 'spring', 
                stiffness: 100, 
                damping: 15 
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: `0 15px 30px ${stat.color}20`
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="stat-icon"
                style={{ color: stat.color }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5
                }}
              >
                <IconComponent />
                <motion.div
                  className="stat-icon-glow"
                  style={{ background: `radial-gradient(circle, ${stat.color}40, transparent)` }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="stat-number"
                style={{ color: stat.color }}
                animate={{
                  textShadow: [
                    `0 0 5px ${stat.color}30`,
                    `0 0 15px ${stat.color}50`,
                    `0 0 5px ${stat.color}30`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {animatedNumbers[stat.key] || 0}
                <motion.span
                  className="stat-plus"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  +
                </motion.span>
              </motion.div>
              
              <div className="stat-content">
            <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
          </div>
              
              {/* Progress Ring */}
              <motion.div 
                className="stat-progress"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 1.5, ease: 'easeOut' }}
              >
                <svg className="stat-progress-ring" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    animate={{
                      strokeDashoffset: 283 - (283 * (stat.number / 100))
                    }}
                    transition={{
                      delay: 0.5 + index * 0.2,
                      duration: 1.5,
                      ease: 'easeOut'
                    }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  );
};

QuickStats.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object),
  profile: PropTypes.shape({
    followers: PropTypes.number,
    following: PropTypes.number,
    public_repos: PropTypes.number,
  }),
};

// Enhanced Skills Overview Section
const SkillsOverview = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [particles, setParticles] = useState([])
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: FiCode,
      color: '#61DAFB',
      gradient: 'linear-gradient(135deg, #61DAFB 0%, #21D4FD 100%)',
      skills: [
        { name: "React", level: 95, color: '#61DAFB' },
        { name: "JavaScript", level: 92, color: '#F7DF1E' },
        { name: "TypeScript", level: 88, color: '#3178C6' },
        { name: "Vue.js", level: 82, color: '#4FC08D' },
        { name: "HTML5", level: 95, color: '#E34F26' },
        { name: "CSS3", level: 90, color: '#1572B6' },
        { name: "Tailwind CSS", level: 90, color: '#06B6D4' },
        { name: "Sass/SCSS", level: 85, color: '#CC6699' },
      ],
    },
    {
      title: "Backend",
      icon: FiActivity,
      color: '#339933',
      gradient: 'linear-gradient(135deg, #339933 0%, #68D391 100%)',
      skills: [
        { name: "Java", level: 80, color: '#ED8B00' },
        { name: "Spring Boot", level: 78, color: '#6DB33F' },
        { name: "Node.js", level: 90, color: '#339933' },
        { name: "Express.js", level: 88, color: '#000000' },
        { name: "REST API", level: 92, color: '#FF6B6B' },
        { name: "GraphQL", level: 75, color: '#E10098' },
      ],
    },
    {
      title: "Database",
      icon: FiBookOpen,
      color: '#336791',
      gradient: 'linear-gradient(135deg, #336791 0%, #4A90E2 100%)',
      skills: [
        { name: "SQL Server", level: 85, color: '#CC2927' },
        { name: "PostgreSQL", level: 85, color: '#336791' },
        { name: "MongoDB", level: 88, color: '#47A248' },
        { name: "Redis", level: 78, color: '#DC382D' },
        { name: "MySQL", level: 82, color: '#4479A1' },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: FiZap,
      color: '#FF9900',
      gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6B6B 100%)',
      skills: [
        { name: "Docker", level: 85, color: '#2496ED' },
        { name: "AWS", level: 80, color: '#FF9900' },
        { name: "Git", level: 95, color: '#F05032' },
        { name: "CI/CD", level: 82, color: '#326CE5' },
        { name: "Linux", level: 88, color: '#FCC624' },
        { name: "Nginx", level: 75, color: '#009639' },
      ],
    },
  ];

  // Initialize particles for background
  useEffect(() => {
    const particleCount = 8
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: skillCategories[Math.floor(Math.random() * skillCategories.length)].color
      })
    }
    
    setParticles(newParticles)
  }, [])

  return (
    <section className="skills-overview">
      {/* Floating particles */}
      <div className="skills-overview__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="skills-overview__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 10,
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
      
      <motion.div 
        className="skills-overview__header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FiStar className="skills-overview__header-icon" />
      <h2>Kỹ Năng Công Nghệ</h2>
        <p>Những công nghệ tôi sử dụng để tạo ra sản phẩm chất lượng cao</p>
      </motion.div>
      
      <div className="skills-grid">
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon
          return (
            <motion.div 
              key={index} 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.1 + index * 0.1, 
                type: 'spring', 
                stiffness: 100, 
                damping: 15 
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: `0 20px 40px ${category.color}20`
              }}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
            <div className="category-header">
                <motion.div 
                  className="category-icon"
                  style={{ 
                    background: category.gradient,
                    color: 'white'
                  }}
                  animate={{
                    rotate: hoveredCategory === index ? [0, 10, -10, 0] : 0,
                    scale: hoveredCategory === index ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: hoveredCategory === index ? Infinity : 0,
                    repeatDelay: 2
                  }}
                >
                  <IconComponent />
                  <motion.div
                    className="category-icon-glow"
                    style={{ background: `radial-gradient(circle, ${category.color}40, transparent)` }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
                <div className="category-info">
                  <h3 style={{ color: category.color }}>{category.title}</h3>
                  <span className="category-count">{category.skills.length} skills</span>
            </div>
              </div>
              
            <div className="skill-list">
              {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.1 + skillIndex * 0.05,
                      type: 'spring',
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      x: 5,
                      backgroundColor: `${skill.color}10`
                    }}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
            </div>
                    <div className="skill-progress">
                      <motion.div
                        className="skill-progress-bar"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          delay: 0.5 + index * 0.1 + skillIndex * 0.05,
                          duration: 1,
                          ease: 'easeOut'
                        }}
                      />
          </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Category summary */}
              <motion.div 
                className="category-summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="summary-stat">
                  <span className="summary-label">Trung bình</span>
                  <span className="summary-value" style={{ color: category.color }}>
                    {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  );
};

// Recent Projects Section
const RecentProjects = ({ repos }) => {
  const featuredRepos = repos?.slice(0, 6) || [];

  return (
    <section className="recent-projects">
      <h2>Dự Án Gần Đây</h2>
      <div className="projects-grid grid grid-3">
        {featuredRepos.map((repo, index) => (
          <div key={index} className="project-card card">
            <div className="project-header">
              <div className="project-icon">📁</div>
              <div className="project-status">
                {repo.private ? (
                  <span className="private-badge">🔒 Private</span>
                ) : (
                  <span className="public-badge">🌍 Public</span>
                )}
              </div>
            </div>
            <div className="project-content">
              <h3>{repo.name}</h3>
              <p className="project-description">
                {repo.description || "Không có mô tả"}
              </p>
              <div className="project-tech">
                {repo.language && (
                  <span className="tech-tag primary">{repo.language}</span>
                )}
                <span className="tech-tag stars">
                  <span className="stat-indicator stars">
                    ⭐ {repo.stargazers_count}
                  </span>
                </span>
                <span className="tech-tag forks">
                  <span className="stat-indicator forks">
                    🔀 {repo.forks_count}
                  </span>
                </span>
              </div>
              <div className="project-links">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Xem Code
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Demo Trực Tiếp
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Experience Timeline Section
const ExperienceTimeline = () => {
  const experiences = [
    {
      date: "2023 - Hiện tại",
      title: "Lập Trình Viên Web Developer",
      company: "Tech Solutions Inc.",
      description:
        "Dẫn dắt phát triển các ứng dụng web có thể mở rộng sử dụng React và Java. Hướng dẫn các lập trình viên junior và triển khai các phương pháp hay nhất.",
    },
    {
      date: "2021 - 2023",
      title: "Lập Trình Viên Backend",
      company: "Digital Innovation Co.",
      description:
        "Phát triển và duy trì nhiều dự án khách hàng sử dụng công nghệ web hiện đại. ",
    },
    {
      date: "2020 - 2021",
      title: "Lập Trình Viên Frontend",
      company: "StartUp Ventures",
      description:
        "Xây dựng các ứng dụng web responsive với React và Vue.js. Tập trung vào trải nghiệm người dùng và tối ưu hóa hiệu suất.",
    },
  ];

  return (
    <section className="experience-timeline">
      <h2>Kinh Nghiệm</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item card">
            <div className="timeline-date">{exp.date}</div>
            <div className="timeline-title">{exp.title}</div>
            <div className="timeline-company">{exp.company}</div>
            <div className="timeline-description">{exp.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ profile, light }) => (
  <section className="contact-section card">
    <h3>Kết Nối</h3>
    <p>
      Tôi luôn quan tâm đến việc nghe về những cơ hội mới và các dự án thú vị.
      Hãy liên hệ nếu bạn muốn hợp tác hoặc chỉ đơn giản là muốn chào hỏi!
    </p>
    <div className="contact-actions">
      <a href="mailto:nhdinhdev03@gmail.com" className="btn btn-primary">
        Email
      </a>
      <a
        href={profile?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/nhdinhdev03"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
      >
        LinkedIn
      </a>
    </div>
    <div className="theme-indicator">
      <div className="theme-status">
        {light
          ? "☀️ Chế Độ Sáng Đang Hoạt Động"
          : "🌙 Chế Độ Tối Đang Hoạt Động"}
      </div>
    </div>
  </section>
);

// Enhanced Personal Journey Section
const PersonalJourney = () => {
  const journey = [
    {
      year: '2020',
      title: 'Bắt đầu hành trình',
      description: 'Khám phá thế giới lập trình với HTML, CSS và JavaScript cơ bản',
      icon: FiBookOpen,
      color: '#6366f1'
    },
    {
      year: '2021',
      title: 'Chuyên sâu Frontend',
      description: 'Học React, TypeScript và các framework hiện đại',
      icon: FiCode,
      color: '#8b5cf6'
    },
    {
      year: '2022',
      title: 'Mở rộng Backend',
      description: 'Phát triển API với Node.js, Express và cơ sở dữ liệu',
      icon: FiActivity,
      color: '#10b981'
    },
    {
      year: '2023',
      title: 'Full-Stack Developer',
      description: 'Hoàn thiện kỹ năng và tham gia các dự án thực tế',
      icon: FiAward,
      color: '#f59e0b'
    },
    {
      year: '2024',
      title: 'Chuyên gia và Mentor',
      description: 'Chia sẻ kiến thức và hướng dẫn các developer mới',
      icon: FiStar,
      color: '#ec4899'
    }
  ]
  
  return (
    <section className="personal-journey">
      <motion.div 
        className="personal-journey__header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FiMapPin className="personal-journey__header-icon" />
        <h2>Hành Trình Phát Triển</h2>
        <p>Từ những bước đầu tiên đến chuyên gia Full-Stack</p>
      </motion.div>
      
      <div className="personal-journey__timeline">
        {journey.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={index}
              className="timeline-item glass-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.2 + index * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: `0 15px 30px ${item.color}20`
              }}
            >
              <motion.div 
                className="timeline-icon"
                style={{ backgroundColor: item.color }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 10
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <IconComponent />
              </motion.div>
              
              <div className="timeline-content">
                <div className="timeline-year" style={{ color: item.color }}>
                  {item.year}
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
              
              <motion.div
                className="timeline-connector"
                style={{ backgroundColor: item.color }}
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// Main About Component
const About = () => {
  const { profile, repos } = useGithubData();
  const [particles, setParticles] = useState([])
  const aboutRef = useRef(null)
  const light =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "light";

  // Reveal-on-scroll like other sections
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Initialize background particles
  useEffect(() => {
    const particleCount = 20
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
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
              x: [`${particle.x}%`, `${(particle.x + 25) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 15,
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
            Về Tôi
          </motion.h2>
          <motion.p variants={itemVariants}>
            Giới thiệu chi tiết về kinh nghiệm, kỹ năng và hành trình phát triển chuyên môn.
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
            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <ProfileHero profile={profile} light={light} />
          </motion.div>
          
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <QuickStats repos={repos} profile={profile} />
          </motion.div>
          
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.5, duration: 1.5, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <SkillsOverview />
          </motion.div>
          
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 2, duration: 1.5, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <PersonalJourney />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

// PropTypes definitions - fix existing warnings
RecentProjects.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      language: PropTypes.string,
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      html_url: PropTypes.string,
      homepage: PropTypes.string,
      private: PropTypes.bool,
    })
  ),
};

ContactSection.propTypes = {
  profile: PropTypes.shape({
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};
