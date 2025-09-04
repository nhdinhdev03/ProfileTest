import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import './Home.scss'

function ModernHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(useTransform(scrollY, [0, 500], [0, -100]), springConfig);
  
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { name: "React", level: 95, icon: "⚛️", color: "#61DAFB" },
    { name: "TypeScript", level: 90, icon: "🔷", color: "#3178C6" },
    { name: "Node.js", level: 85, icon: "🟢", color: "#339933" },
    { name: "GraphQL", level: 80, icon: "🔮", color: "#E10098" },
    { name: "Tailwind", level: 92, icon: "🎨", color: "#06B6D4" },
    { name: "SCSS", level: 88, icon: "💄", color: "#CF649A" },
    { name: "Framer Motion", level: 85, icon: "🎭", color: "#0055FF" },
    { name: "A11y", level: 87, icon: "♿", color: "#4F46E5" }
  ];

  const featured = [
    { 
      id: 1, 
      title: "Realtime Dashboard", 
      stack: ["React", "WebSocket", "D3.js"], 
      desc: "High‑frequency financial metrics with smooth streaming charts and real-time analytics.",
      status: "Live",
      gradient: "from-blue-500 to-purple-600"
    },
    { 
      id: 2, 
      title: "E‑commerce Platform", 
      stack: ["Node", "GraphQL", "Stripe"], 
      desc: "Modular headless commerce API with dynamic storefront and payment integration.",
      status: "Beta",
      gradient: "from-green-500 to-teal-600"
    },
    { 
      id: 3, 
      title: "Design System", 
      stack: ["TypeScript", "Storybook", "Figma"], 
      desc: "Accessible UI kit with comprehensive design tokens and component library.",
      status: "Active",
      gradient: "from-purple-500 to-pink-600"
    },
  ];

  const achievements = [
    { metric: "50+", label: "Projects Completed" },
    { metric: "3Y+", label: "Experience" },
    { metric: "98%", label: "Client Satisfaction" },
    { metric: "15+", label: "Technologies" }
  ];

  return (
    <>
      {/* Floating Cursor Effect */}
      <motion.div 
        className="floating-cursor"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Ultra Modern Hero Section with 3D Effects */}
      <motion.section 
        id="home" 
        className="hero"
        ref={heroRef}
        style={{ y, opacity, scale }}
      >
        {/* Animated Background Elements */}
        <div className="hero-bg-elements">
          <motion.div 
            className="floating-orb orb-1"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="floating-orb orb-2"
            animate={{
              x: [0, -80, 0],
              y: [0, 120, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="floating-orb orb-3"
            animate={{
              x: [0, 60, 0],
              y: [0, -80, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="status-dot"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {' '}
              Available for work
            </motion.div>
            
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="hero-title">
                <motion.span 
                  className="greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Hi, I'm
                </motion.span>
                <motion.span 
                  className="name-highlight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.8)"
                  }}
                >
                  Dinh
                </motion.span>
                <motion.span 
                  className="role"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  Front‑End Engineer
                </motion.span>
              </h1>
              <motion.p 
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                I craft performant, accessible interfaces and delightful product experiences.
                Focused on design systems, micro‑frontends & smooth interactions that users love.
              </motion.p>
            </motion.div>

            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <motion.a 
                href="#projects" 
                className="btn btn--primary"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <span>View Projects</span>
                <motion.span 
                  className="btn-icon"
                  animate={{ x: isHovered ? 5 : 0 }}
                >
                  🚀
                </motion.span>
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn btn--secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Me</span>
                <span className="btn-icon">📧</span>
              </motion.a>
            </motion.div>

            <motion.div 
              className="skills-showcase"
              ref={skillsRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <h3 className="skills-title">Tech Stack</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isSkillsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                      boxShadow: `0 10px 30px ${skill.color}40`
                    }}
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress" 
                        style={{ '--skill-color': skill.color }}
                        initial={{ width: 0 }}
                        animate={isSkillsInView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1.5, 
                          delay: index * 0.1 + 0.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    <motion.div 
                      className="skill-level"
                      initial={{ opacity: 0 }}
                      animate={isSkillsInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      {skill.level}%
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ x }}
          >
            <motion.div 
              className="visual-card"
              whileHover={{ 
                rotateY: 5,
                rotateX: 5,
                scale: 1.02
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="card-header">
                <div className="card-dots">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <span className="card-title">Currently Building</span>
              </div>
              
              <div className="card-content">
                <div className="project-info">
                  <h4>AI‑Assisted Component Library</h4>
                  <p>Optimizing bundle size and accessibility metrics with intelligent code generation.</p>
                  
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Development Progress</span>
                      <span>78%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, delay: 2 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="values-section">
                  <h4>Core Values</h4>
                  <ul className="values-list">
                    {[
                      { icon: "⚡", text: "Performance first" },
                      { icon: "🎨", text: "Design consistency" },
                      { icon: "♿", text: "Inclusive UX" },
                      { icon: "🔧", text: "Maintainability" }
                    ].map((value, index) => (
                      <motion.li
                        key={value.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.5 + index * 0.2 }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="value-icon">{value.icon}</span>
                        {value.text}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="achievement-grid">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={achievement.label} 
                  className="achievement-item"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 2.2 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateZ: 2,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                  }}
                >
                  <motion.span 
                    className="achievement-metric"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 2.5 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                  >
                    {achievement.metric}
                  </motion.span>
                  <span className="achievement-label">{achievement.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Ultra Modern Featured Projects Section */}
      <motion.section 
        id="projects" 
        className="projects-section"
        ref={projectsRef}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isProjectsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="section-number"
                initial={{ opacity: 0, x: -20 }}
                animate={isProjectsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                01.
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={isProjectsInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                Featured Work
              </motion.span>
            </motion.h2>
            <motion.p 
              className="section-description"
              initial={{ opacity: 0, y: 20 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              Selected projects demonstrating product thinking & engineering depth.
            </motion.p>
          </motion.div>

          <div className="projects-grid">
            {featured.map((project, index) => (
              <motion.article 
                key={project.id} 
                className="project-card"
                initial={{ opacity: 0, y: 60, rotateY: -10 }}
                animate={isProjectsInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0 
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 1 + index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 2,
                  z: 50
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center"
                }}
              >
                <motion.div 
                  className="project-glow"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="project-header">
                  <motion.div 
                    className="project-status"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.span 
                      className="status-badge"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.3)",
                          "0 0 0 10px rgba(34, 197, 94, 0)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {project.status}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    className="project-title"
                    whileHover={{ color: "var(--color-primary)" }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <div className="project-stack">
                    {project.stack.map((tech, techIndex) => (
                      <motion.span 
                        key={tech} 
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isProjectsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          delay: 1.5 + index * 0.2 + techIndex * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "var(--color-primary)",
                          color: "white"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div 
                  className="project-content"
                  initial={{ opacity: 0 }}
                  animate={isProjectsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.8 + index * 0.2 }}
                >
                  <p className="project-description">{project.desc}</p>
                  
                  <div className="project-actions">
                    <motion.button 
                      className="btn btn--ghost"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(59, 130, 246, 0.1)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Details</span>
                      <motion.span 
                        className="btn-icon"
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                    <motion.button 
                      className="btn btn--icon"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        backgroundColor: "rgba(255, 215, 0, 0.2)"
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span>⭐</span>
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  className="project-visual"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isProjectsInView ? { opacity: 0.6, scale: 1 } : {}}
                  transition={{ delay: 2 + index * 0.2 }}
                  whileHover={{ 
                    opacity: 0.8,
                    scale: 1.1,
                    rotate: 10
                  }}
                >
                  <div className={`project-gradient ${project.gradient}`} />
                </motion.div>

                {/* Interactive Particles */}
                <div className="project-particles">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="particle"
                      initial={{ 
                        opacity: 0,
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100
                      }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        x: [
                          Math.random() * 200 - 100,
                          Math.random() * 300 - 150,
                          Math.random() * 200 - 100
                        ],
                        y: [
                          Math.random() * 200 - 100,
                          Math.random() * 300 - 150,
                          Math.random() * 200 - 100
                        ],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5
                      }}
                    />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div 
            className="projects-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isProjectsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
          >
            <motion.a 
              href="#projects" 
              className="btn btn--outline btn--large"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                borderColor: "var(--color-primary)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Projects</span>
              <motion.span 
                className="btn-icon"
                whileHover={{ rotate: 15 }}
              >
                📁
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

export default ModernHome;