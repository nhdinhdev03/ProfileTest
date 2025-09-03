import React, { useState } from "react";
import './ModernProjects.scss'
const allProjects = [
  { id:1, title:'Realtime Analytics', cat:'dashboard', stack:['React','D3'], desc:'High‑throughput metrics visualization with adaptive polling & websockets.' },
  { id:2, title:'Headless Commerce', cat:'platform', stack:['Node','GraphQL'], desc:'Composable commerce API with dynamic pricing & inventory sync.' },
  { id:3, title:'Design System Tokens', cat:'tooling', stack:['TS','Storybook'], desc:'Multi‑brand theming pipeline & accessibility testing workflow.' },
  { id:4, title:'Micro‑frontend Shell', cat:'architecture', stack:['ModuleFed','React'], desc:'Runtime integration & shared dependency orchestration.' },
  { id:5, title:'Image Optimization Service', cat:'performance', stack:['Node','Sharp'], desc:'On‑the‑fly transformations w/ caching & format negotiation.' },
];

const categories = ["all","dashboard","platform","tooling","architecture","performance"];

function ModernProjects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === 'all' ? allProjects : allProjects.filter(p=>p.cat===filter);

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <h2>Project <span className="gradient-text">Showcase</span></h2>
          <p>End‑to‑end product builds, platform tooling & performance work.</p>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'.6rem',justifyContent:'center',marginBottom:'2.2rem'}}>
          {categories.map(c => (
            <button
              key={c}
              onClick={()=>setFilter(c)}
              className={`btn btn--outline${filter===c? ' active': ''}`}
              style={{padding:'.55rem .95rem',fontSize:'.6rem',letterSpacing:'1px',textTransform:'uppercase',background: filter===c ? 'linear-gradient(90deg,var(--color-primary),var(--color-secondary))' : undefined, color: filter===c? '#fff': undefined}}
            >{c}</button>
          ))}
        </div>
        <div className="projects-grid" style={{display:'grid',gap:'1.6rem',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
          {filtered.map((p,i)=>(
            <article key={p.id} className="card-3d" data-aos="fade-up" data-aos-delay={100 + i*50}>
              <h3 style={{margin:'0 0 .6rem',fontSize:'1.05rem'}}>{p.title}</h3>
              <p style={{margin:'0 0 .9rem',fontSize:'.75rem',lineHeight:1.5,color:'var(--color-text-muted)'}}>{p.desc}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'.8rem'}}>
                {p.stack.map(s => <span key={s} className="tag" style={{fontSize:'.55rem'}}>{s}</span>)}
              </div>
              <div style={{display:'flex',gap:'.5rem'}}>
                <button className="btn" style={{padding:'.55rem .9rem',fontSize:'.65rem'}}>Demo</button>
                <button className="btn btn--outline" style={{padding:'.55rem .9rem',fontSize:'.65rem'}}>Code</button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="glass-panel" style={{padding:'2rem',textAlign:'center'}} data-aos="fade-up">
              <p style={{margin:0,fontSize:'.8rem'}}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ModernProjects;