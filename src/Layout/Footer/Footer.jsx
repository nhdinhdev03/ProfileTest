import './Footer.scss'

function ModernFooter() {
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/nhdinhdev03', 
      icon: '🐱',
      handle: '@nhdinhdev03'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/nhdinhdev03', 
      icon: '💼',
      handle: 'in/nhdinhdev03'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/nhdinhdev03', 
      icon: '🐦',
      handle: '@nhdinhdev03'
    },
    { 
      name: 'Email', 
      url: 'mailto:nhdinhdev03@gmail.com', 
      icon: '📧',
      handle: 'nhdinhdev03@gmail.com'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="container">
          {/* Main Footer Content */}
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand">
              <h3 className="footer-logo">
                <span className="logo-icon">⚡</span>
                {' '}
                Dinh's Portfolio
              </h3>
              <p className="footer-tagline">
                Crafting exceptional digital experiences with modern web technologies.
              </p>
              <div className="footer-status">
                <span className="status-indicator"></span>
                <span className="status-text">Available for new opportunities</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Quick Links</h4>
              <nav className="footer-nav">
                {quickLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="footer-link"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Connect</h4>
              <div className="social-links">
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                    title={`${social.name} - ${social.handle}`}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <div className="social-info">
                      <span className="social-name">{social.name}</span>
                      <span className="social-handle">{social.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter/Contact CTA */}
            <div className="footer-section">
              <h4 className="footer-section-title">Let's Work Together</h4>
              <p className="footer-cta-text">
                Have a project in mind? Let's discuss how we can bring your ideas to life.
              </p>
              <a href="#contact" className="footer-cta-btn">
                <span>Get In Touch</span>
                <span className="cta-icon">→</span>
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                &copy; {year} Dinh's Portfolio. 
                <span className="divider">•</span>
                {' '}
                Built with 
                <span className="tech-love">
                  <span className="heart">❤️</span>
                  {' '}
                  React & SCSS
                </span>
              </p>
            </div>
            
            <div className="footer-meta">
              <span className="footer-version">v2.0</span>
              <span className="divider">•</span>
              <span className="footer-update">Last updated: Nov 2024</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Effects */}
      <div className="footer-bg-effects">
        <div className="footer-gradient"></div>
        <div className="footer-dots"></div>
      </div>
    </footer>
  );
}

export default ModernFooter;