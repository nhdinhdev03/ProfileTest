function ModernFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'1.2rem',justifyContent:'space-between'}}>
          <p style={{margin:0}}>&copy; {year} My Portfolio • Crafted with React.</p>
          <div style={{display:'flex',gap:'.75rem'}} className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" style={{fontSize:'.9rem'}}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" style={{fontSize:'.9rem'}}>LinkedIn</a>
            <a href="mailto:you@example.com" aria-label="Email" title="Email" style={{fontSize:'.9rem'}}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ModernFooter;