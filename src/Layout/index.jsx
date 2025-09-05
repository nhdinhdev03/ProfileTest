import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './style.scss';

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
