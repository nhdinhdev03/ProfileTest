import React from "react";

const posts = [
  { id:1, title:'Optimizing React Rendering', tag:'performance', excerpt:'Patterns & heuristics for avoiding wasted renders and improving UI responsiveness.' },
  { id:2, title:'Design Tokens Workflow', tag:'design-system', excerpt:'Scalable multi-brand theming with a tokens pipeline & CI preview.' },
  { id:3, title:'Accessible Interactive Components', tag:'a11y', excerpt:'Building composable headless primitives with keyboard & screen‑reader support.' },
];

function ModernBlog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <h2>Latest <span className="gradient-text">Insights</span></h2>
          <p>Notes on performance, design systems, accessibility & engineering craft.</p>
        </div>
        <div style={{display:'grid',gap:'1.7rem',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))'}}>
          {posts.map((p,i)=> (
            <article key={p.id} className="card-3d" data-aos="fade-up" data-aos-delay={80 + i*80}>
              <header style={{display:'flex',flexDirection:'column',gap:'.4rem'}}>
                <div className="tag" style={{fontSize:'.55rem',alignSelf:'flex-start'}}>{p.tag}</div>
                <h3 style={{margin:'0 0 .3rem',fontSize:'1.05rem'}}>{p.title}</h3>
              </header>
              <p style={{margin:'0 0 1.1rem',fontSize:'.78rem',lineHeight:1.55,color:'var(--color-text-muted)'}}>{p.excerpt}</p>
              <button className="btn btn--outline" style={{padding:'.55rem .9rem',fontSize:'.65rem'}}>Read More</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModernBlog;