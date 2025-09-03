import React from "react";

function ModernContact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <h2>Get In <span className="gradient-text">Touch</span></h2>
          <p>Collaboration, consulting or a friendly hello — drop a message.</p>
        </div>
        <div style={{display:'grid',gap:'2.5rem',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))'}}>
          <div className="glass-panel" style={{padding:'1.8rem 1.8rem 2.2rem'}} data-aos="fade-right">
            <h3 style={{margin:'0 0 1.2rem',fontSize:'1rem',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--color-text-muted)'}}>Contact Info</h3>
            <ul style={{listStyle:'none',margin:0,padding:0,display:'grid',gap:'1rem',fontSize:'.85rem'}}>
              <li><strong>Email:</strong> you@example.com</li>
              <li><strong>Location:</strong> Remote / GMT+7</li>
              <li><strong>Freelance:</strong> Available</li>
            </ul>
            <div style={{display:'flex',gap:'.6rem',marginTop:'1.5rem'}}>
              <a className="btn" style={{padding:'.55rem .95rem',fontSize:'.7rem'}} href="mailto:you@example.com">Email</a>
              <a className="btn btn--outline" style={{padding:'.55rem .95rem',fontSize:'.7rem'}} href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <form className="glass-panel" style={{padding:'1.8rem 1.8rem 2.2rem'}} data-aos="fade-left" onSubmit={(e)=>{e.preventDefault(); alert('Message submitted (demo)');}}>
            <h3 style={{margin:'0 0 1.2rem',fontSize:'1rem',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--color-text-muted)'}}>Send Message</h3>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>
            <div className="field" style={{marginTop:'1rem'}}>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} required placeholder="Project idea, opportunity or hello..." />
            </div>
            <div style={{marginTop:'1.4rem'}}>
              <button className="btn" style={{padding:'.75rem 1.4rem'}}>Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ModernContact;