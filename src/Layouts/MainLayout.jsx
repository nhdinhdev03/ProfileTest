import React, { Suspense } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children, theme, toggleTheme }) => {
  return (
    <div className="App" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>{children}</main>
      <Suspense fallback={<div className="loading-footer">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MainLayout;
