import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.scss";

function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="app-layout">
      <div className="layout-background">
        <div className="bg-grid"></div>
        <div className="bg-gradient-orb bg-gradient-orb--primary"></div>
        <div className="bg-gradient-orb bg-gradient-orb--secondary"></div>
        <div className="bg-noise"></div>
      </div>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <span className="arrow">↑</span>
      </button>
      
      {/* First time visitors will see scroll indicator */}
      <div className="scroll-indicator-container">
        <div className="scroll-indicator"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
