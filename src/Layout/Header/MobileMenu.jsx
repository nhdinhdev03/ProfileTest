import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import './MobileMenu.scss';

function MobileMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close menu when changing routes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);
  
  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu-container">
      <button 
        className={`mobile-menu-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <nav aria-label="Mobile Navigation">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => 
                    isActive ? "mobile-nav-link active" : "mobile-nav-link"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  <span className="mobile-nav-label">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
