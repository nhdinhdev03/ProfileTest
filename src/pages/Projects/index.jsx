import React from 'react';
import './style.scss';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of the first project, highlighting its main features and technologies used.',
    imageUrl: 'https://via.placeholder.com/400x300',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of the second project, highlighting its main features and technologies used.',
    imageUrl: 'https://via.placeholder.com/400x300',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of the third project, highlighting its main features and technologies used.',
    imageUrl: 'https://via.placeholder.com/400x300',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'A brief description of the fourth project, highlighting its main features and technologies used.',
    imageUrl: 'https://via.placeholder.com/400x300',
    demoUrl: '#',
    repoUrl: '#'
  }
];

const Projects = () => {
  return (
    <div className="projects-page">
      <section className="projects-section">
        <div className="projects-container">
          <h2>My Projects</h2>
          <motion.div 
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projectsData.map(project => (
              <motion.div 
                key={project.id} 
                className="project-card"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={project.imageUrl} alt={project.title} />
                <div className="project-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link">View Code</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
