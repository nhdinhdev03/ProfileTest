import React from "react";

function ModernHome() {
  const skills = ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind", "SCSS", "Framer Motion", "A11y"];
  const featured = [
    { id: 1, title: "Realtime Dashboard", stack: ["React", "WebSocket"], desc: "High‑frequency financial metrics with smooth streaming charts." },
    { id: 2, title: "E‑commerce Platform", stack: ["Node", "GraphQL"], desc: "Modular headless commerce API & dynamic storefront." },
    { id: 3, title: "Design System", stack: ["TS", "Storybook"], desc: "Accessible UI kit with theming & tokens." },
  ];

  return (
    <>
      {/* Hero */}
      <section id="home" className="hero">
        <div className="container" style={{display:'grid', gap:'3.5rem', gridTemplateColumns:'repeat(auto-fit, minmax(320px,1fr))'}}>
          <div data-aos="fade-right" data-aos-delay="50" style={{display:'flex',flexDirection:'column',gap:'1.6rem'}}>
            <div>
              <h1 style={{margin:0,fontSize:'clamp(2.4rem,5.2vw,3.4rem)',fontWeight:700,letterSpacing:'-.5px'}}>
                <span className="gradient-text">Hi, I'm Dinh</span><br />
                Front‑End Engineer
              </h1>
              <p style={{maxWidth:560,margin:'1.15rem 0 0',color:'var(--color-text-muted)',fontSize:'1.05rem',lineHeight:1.6}}>
                I craft performant, accessible interfaces and delightful product experiences.
                Focused on design systems, micro‑frontends & smooth interactions.
              </p>
            </div>
            <div style={{display:'flex',gap:'.9rem',flexWrap:'wrap'}}>
              <a href="#projects" className="btn">View Projects</a>
              <a href="#contact" className="btn btn--outline">Contact Me</a>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'.55rem'}} aria-label="Skill highlights">
              {skills.map(s => <span key={s} className="tag" style={{fontSize:'.58rem'}}>{s}</span>)}
            </div>
          </div>
          <div data-aos="zoom-in" data-aos-delay="120" style={{alignSelf:'center'}}>
            <div className="glass-panel" style={{padding:'2.2rem 2.2rem 2.6rem', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 30% 20%,rgba(255,255,255,0.12),transparent 70%)',mixBlendMode:'overlay',pointerEvents:'none'}} />
              <div style={{display:'flex',flexDirection:'column',gap:'1.35rem'}}>
                <div>
                  <h3 style={{margin:'0 0 .5rem',fontSize:'1rem',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--color-text-muted)'}}>Currently Building</h3>
                  <p style={{margin:0,fontSize:'.9rem',lineHeight:1.5,color:'var(--color-text)'}}>An AI‑assisted component library optimizing bundle size and accessibility metrics.</p>
                </div>
                <div>
                  <h3 style={{margin:'0 0 .5rem',fontSize:'1rem',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--color-text-muted)'}}>Core Values</h3>
                  <ul style={{margin:0,padding:'0 0 0 1.1rem',display:'grid',gap:'.4rem',fontSize:'.85rem',color:'var(--color-text)'}}>
                    <li>Performance first</li>
                    <li>Design consistency</li>
                    <li>Inclusive UX</li>
                    <li>Maintainability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section id="projects" style={{paddingTop:0}}>
        <div className="container">
          <div className="section-head" data-aos="fade-up">
            <h2 className="gradient-text">Featured Work</h2>
            <p>Selected projects demonstrating product thinking & engineering depth.</p>
          </div>
          <div className="projects-grid" style={{display:'grid',gap:'1.6rem',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
            {featured.map((p,i) => (
              <article key={p.id} className="card-3d" data-aos="fade-up" data-aos-delay={100 + i*70}>
                <header style={{display:'flex',flexDirection:'column',gap:'.45rem'}}>
                  <h3 style={{margin:'0 0 .2rem',fontSize:'1.05rem'}}>{p.title}</h3>
                  <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap'}}>
                    {p.stack.map(s=> <span key={s} className="tag" style={{fontSize:'.55rem'}}>{s}</span>)}
                  </div>
                </header>
                <p style={{margin:'1rem 0 .5rem',fontSize:'.8rem',lineHeight:1.5,color:'var(--color-text-muted)'}}>{p.desc}</p>
                <button className="btn btn--outline" style={{fontSize:'.65rem',padding:'.55rem .9rem',marginTop:'.4rem'}}>Details</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ModernHome;