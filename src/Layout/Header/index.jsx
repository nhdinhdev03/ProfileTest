import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">MyPortfolio</NavLink>
        </div>
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>Projects</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
          </ul>
        </nav>
        <div className="header-actions">
          {/* Theme toggle will be added here */}
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
