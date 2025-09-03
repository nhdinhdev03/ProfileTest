import React from "react";
import './ModernAbout.scss'

function ModernAbout() {
  const timeline = [
    { 
      year: '2022‑Now', 
      role: 'Senior Front‑End Engineer', 
      org: 'TechCorp', 
      location: 'San Francisco, CA',
      bullets: ['Led design system architecture serving 50+ developers','Reduced bundle size by 40% through micro‑frontend optimization','Implemented accessibility standards achieving WCAG 2.1 AA compliance'],
      technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL']
    },
    { 
      year: '2021‑2022', 
      role: 'UI Developer', 
      org: 'StartupX', 
      location: 'Remote',
      bullets: ['Built MVP from 0 to 10k+ users in 6 months','Implemented A/B testing infrastructure increasing conversion by 25%','Developed real-time analytics dashboard with WebSocket integration'],
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB']
    },
    { 
      year: '2019‑2021', 
      role: 'Freelance Developer', 
      org: 'Various Clients', 
      location: 'Remote',
      bullets: ['Delivered 20+ custom web applications','Specialized in e‑commerce platforms and business dashboards','Maintained 98% client satisfaction rating'],
      technologies: ['Vue.js', 'PHP', 'WordPress', 'MySQL']
    },
  ];

  const skillGroups = [
    { 
      title: 'Frontend Technologies', 
      icon: '🎨',
      items: ['HTML5 & Semantic Web','CSS3 / SCSS / Tailwind','JavaScript (ES2023)','TypeScript','React & Next.js','Vue.js & Nuxt.js']
    },
    { 
      title: 'Backend & Tools', 
      icon: '⚙️',
      items: ['Node.js & Express','GraphQL & REST APIs','Webpack & Vite','Docker & CI/CD','Git & GitHub Actions','Testing (Jest, Cypress)']
    },
    { 
      title: 'Design & UX', 
      icon: '🎭',
      items: ['Figma & Adobe XD','Design Systems','Accessibility (A11y)','Performance Optimization','User Experience Design','Responsive Design']
    },
    { 
      title: 'Emerging Tech', 
      icon: '🚀',
      items: ['AI/ML Integration','Web3 & Blockchain','Progressive Web Apps','Serverless Architecture','Edge Computing','WebAssembly']
    },
  ];

  const achievements = [
    { number: '50+', label: 'Projects Delivered', icon: '🎯' },
    { number: '3+', label: 'Years Experience', icon: '📅' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '40%', label: 'Performance Gains', icon: '⚡' }
  ];

  const personalInfo = {
    location: 'Ho Chi Minh City, Vietnam',
    timezone: 'GMT+7',
    languages: ['Vietnamese (Native)', 'English (Fluent)', 'Japanese (Basic)'],
    interests: ['Open Source', 'Tech Blogging', 'Photography', 'Coffee Brewing']
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Enhanced Section Header */}
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">
            <span className="section-number">02.</span>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-description">
            Blending clean UI engineering with product empathy & performance focus.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Personal Story */}
          <div className="story-section" data-aos="fade-right">
            <div className="story-content">
              <h3 className="story-title">My Journey</h3>
              <div className="story-text">
                <p>
                  I'm a passionate front‑end engineer who discovered the magic of code during university. 
                  What started as curiosity about how websites work has evolved into a deep love for 
                  crafting maintainable, performant interfaces that users actually enjoy using.
                </p>
                <p>
                  I specialize in building design systems, optimizing performance, and collaborating 
                  across design & backend teams to deliver cohesive product experiences. My approach 
                  balances technical excellence with user empathy.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open source, writing technical 
                  articles, or exploring the latest web technologies. I believe in continuous learning 
                  and sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="personal-info-card">
              <h4>Quick Facts</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <span className="info-label">Location</span>
                    <span className="info-value">{personalInfo.location}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🌍</span>
                  <div>
                    <span className="info-label">Timezone</span>
                    <span className="info-value">{personalInfo.timezone}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🗣️</span>
                  <div>
                    <span className="info-label">Languages</span>
                    <div className="info-values">
                      {personalInfo.languages.map(lang => (
                        <span key={lang} className="info-tag">{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🎯</span>
                  <div>
                    <span className="info-label">Interests</span>
                    <div className="info-values">
                      {personalInfo.interests.map(interest => (
                        <span key={interest} className="info-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="timeline-section" data-aos="fade-left">
            <h3 className="timeline-title">Experience</h3>
            <div className="timeline">
              {timeline.map((experience, index) => (
                <div key={experience.year} className="timeline-item" data-aos="fade-up" data-aos-delay={100 + index * 100}>
                  <div className="timeline-marker">
                    <span className="timeline-dot"></span>
                    <div className="timeline-year">{experience.year}</div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="timeline-role">{experience.role}</h4>
                      <div className="timeline-meta">
                        <span className="timeline-org">{experience.org}</span>
                        <span className="timeline-location">{experience.location}</span>
                      </div>
                    </div>
                    <ul className="timeline-bullets">
                      {experience.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="timeline-tech">
                      {experience.technologies.map(tech => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section" data-aos="fade-up">
          <h3 className="skills-title">Technical Expertise</h3>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <div key={group.title} className="skill-group" data-aos="fade-up" data-aos-delay={100 + index * 100}>
                <div className="skill-group-header">
                  <span className="skill-group-icon">{group.icon}</span>
                  <h4 className="skill-group-title">{group.title}</h4>
                </div>
                <div className="skill-items">
                  {group.items.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-section" data-aos="fade-up">
          <h3 className="achievements-title">Key Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="achievement-card" data-aos="zoom-in" data-aos-delay={100 + index * 100}>
                <span className="achievement-icon">{achievement.icon}</span>
                <span className="achievement-number">{achievement.number}</span>
                <span className="achievement-label">{achievement.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModernAbout;