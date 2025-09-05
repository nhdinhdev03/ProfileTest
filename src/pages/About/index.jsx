import React from 'react';
import './style.scss';
import AnimateOnScroll from '../../hooks/AnimateOnScroll';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <div className="about-container">
          <AnimateOnScroll animation="fade-right" className="about-image">
            {/* Placeholder for profile picture */}
            <img src="https://via.placeholder.com/400" alt="Profile" />
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" className="about-content">
            <h2>About Me</h2>
            <p>
              Hello! I'm a passionate and results-oriented software developer with a strong foundation in front-end and back-end technologies. My journey in web development started with a curiosity for how things work on the internet, and it has since grown into a full-fledged passion for building beautiful, functional, and user-centric web applications.
            </p>
            <p>
              I specialize in JavaScript and have extensive experience with modern frameworks like React. I'm also proficient in building RESTful APIs with Node.js and Express. I'm a firm believer in clean code, agile methodologies, and continuous learning.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default About;
