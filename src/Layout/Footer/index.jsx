import React from 'react';
import './style.scss';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
