import React from "react";
import PropTypes from "prop-types";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.scss";

function Layout({ children }) {
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
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
