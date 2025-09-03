import React from "react";
import './ModernAbout.scss'
function ModernAbout() {
  const timeline = [
    { year: '2022‑Now', role: 'Front‑End Engineer', org: 'TechCorp', bullets: ['Design system ownership','Performance budgets','Micro‑frontend architecture']},
    { year: '2021‑2022', role: 'UI Developer', org: 'StartupX', bullets: ['MVP launches','A/B testing infra','Analytics integration']},
    { year: '2019‑2021', role: 'Freelance', org: 'Client Projects', bullets: ['Landing pages','E‑commerce','Custom dashboards']},
  ];

  const skillGroups = [
    { title: 'Core', items: ['HTML5','CSS3 / SCSS','JavaScript (ESNext)','TypeScript']},
    { title: 'Frameworks', items: ['React','Next.js','Vite','Node.js']},
    { title: 'Tooling', items: ['Webpack','Vitest/Jest','Storybook','ESLint / Prettier']},
    { title: 'UX & Quality', items: ['A11y','Lighthouse','Perf Audits','Design Tokens']},
  ];

  return (
    <section id="about">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <h2>About <span className="gradient-text">Me</span></h2>
          <p>Blending clean UI engineering with product empathy & performance focus.</p>
        </div>
        <div style={{display:'grid',gap:'3rem',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'1.6rem'}}>
            <p style={{margin:0,color:'var(--color-text-muted)',fontSize:'.95rem',lineHeight:1.65}} data-aos="fade-right">
              I'm a front‑end engineer focused on crafting maintainable, performant interfaces.
              I enjoy building design systems, improving DX, and collaborating across design & backend
              to deliver cohesive product experiences.
            </p>
            <div className="glass-panel" style={{padding:'1.4rem 1.4rem 1.8rem'}} data-aos="fade-right" data-aos-delay="120">
              <h3 style={{margin:'0 0 1rem',fontSize:'1rem',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--color-text-muted)'}}>Experience</h3>
              <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'1.4rem'}}>
                {timeline.map((t,i) => (
                  <li key={t.year} style={{position:'relative'}} data-aos="fade-up" data-aos-delay={140 + i*80}>
                    <div style={{fontSize:'.7rem',letterSpacing:'1px',textTransform:'uppercase',color:'var(--color-primary-accent)',fontWeight:600}}>{t.year}</div>
                    <div style={{fontWeight:600,margin:'.3rem 0 .4rem'}}>{t.role} • {t.org}</div>
                    <ul style={{margin:0,padding:'0 0 0 1.1rem',display:'grid',gap:'.3rem',fontSize:'.75rem',color:'var(--color-text-muted)'}}>
                      {t.bullets.map(b => <li key={b}>{b}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{display:'grid',gap:'1.4rem',alignContent:'start'}}>
            {skillGroups.map((g,i) => (
              <div key={g.title} className="card-3d" data-aos="fade-left" data-aos-delay={60 + i*70}>
                <h3 style={{margin:'0 0 .8rem',fontSize:'.85rem',letterSpacing:'1px',textTransform:'uppercase',color:'var(--color-text-muted)'}}>{g.title}</h3>
                <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem'}}>
                  {g.items.map(it => <span key={it} className="tag" style={{fontSize:'.55rem'}}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModernAbout;