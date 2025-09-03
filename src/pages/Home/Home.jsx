import React from "react";
import './Home.scss'

function ModernHome() {
  const skills = [
    { name: "React", level: 95, icon: "⚛️" },
    { name: "TypeScript", level: 90, icon: "🔷" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "GraphQL", level: 80, icon: "🔮" },
    { name: "Tailwind", level: 92, icon: "🎨" },
    { name: "SCSS", level: 88, icon: "💄" },
    { name: "Framer Motion", level: 85, icon: "🎭" },
    { name: "A11y", level: 87, icon: "♿" }
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
      {/* Enhanced Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content" data-aos="fade-right" data-aos-delay="100">
            <div className="hero-badge">
              <span className="status-dot"></span>
              {' '}
              Available for work
            </div>
            
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="greeting">Hi, I'm</span>
                <span className="name-highlight">Dinh</span>
                <span className="role">Front‑End Engineer</span>
              </h1>
              <p className="hero-description">
                I craft performant, accessible interfaces and delightful product experiences.
                Focused on design systems, micro‑frontends & smooth interactions that users love.
              </p>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn btn--primary">
                <span>View Projects</span>
                <span className="btn-icon">🚀</span>
              </a>
              <a href="#contact" className="btn btn--secondary">
                <span>Contact Me</span>
                <span className="btn-icon">📧</span>
              </a>
            </div>

            <div className="skills-showcase">
              <h3 className="skills-title">Tech Stack</h3>
              <div className="skills-grid">
                {skills.map(skill => (
                  <div key={skill.name} className="skill-item" data-aos="fade-up" data-aos-delay="200">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{'--progress': `${skill.level}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual" data-aos="zoom-in" data-aos-delay="300">
            <div className="visual-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
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
                      <div className="progress-fill" style={{'--progress': '78%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="values-section">
                  <h4>Core Values</h4>
                  <ul className="values-list">
                    <li><span className="value-icon">⚡</span> Performance first</li>
                    <li><span className="value-icon">🎨</span> Design consistency</li>
                    <li><span className="value-icon">♿</span> Inclusive UX</li>
                    <li><span className="value-icon">🔧</span> Maintainability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="achievement-grid">
              {achievements.map((achievement, index) => (
                <div key={achievement.label} className="achievement-item" data-aos="fade-up" data-aos-delay={400 + index * 100}>
                  <span className="achievement-metric">{achievement.metric}</span>
                  <span className="achievement-label">{achievement.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">
              <span className="section-number">01.</span>
              {' '}
              Featured Work
            </h2>
            <p className="section-description">
              Selected projects demonstrating product thinking & engineering depth.
            </p>
          </div>

          <div className="projects-grid">
            {featured.map((project, index) => (
              <article key={project.id} className="project-card" data-aos="fade-up" data-aos-delay={100 + index * 100}>
                <div className="project-header">
                  <div className="project-status">
                    <span className="status-badge">{project.status}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-stack">
                    {project.stack.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-content">
                  <p className="project-description">{project.desc}</p>
                  
                  <div className="project-actions">
                    <button className="btn btn--ghost">
                      <span>View Details</span>
                      <span className="btn-icon">→</span>
                    </button>
                    <button className="btn btn--icon">
                      <span>⭐</span>
                    </button>
                  </div>
                </div>

                <div className="project-visual">
                  <div className={`project-gradient ${project.gradient}`}></div>
                </div>
              </article>
            ))}
          </div>

          <div className="projects-cta" data-aos="fade-up" data-aos-delay="400">
            <a href="#projects" className="btn btn--outline btn--large">
              <span>View All Projects</span>
              <span className="btn-icon">📁</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ModernHome;