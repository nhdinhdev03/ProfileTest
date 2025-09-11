import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PageTransition from '../components/PageTransition/PageTransition';
import '../components/PageTransition/PageTransition.scss';

const MainLayout = ({ children, theme, toggleTheme }) => {
  return (
    <div className="App" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <PageTransition>
          <Suspense 
            fallback={
              <div className="page-loading">
                <div className="loading-content">
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                  <div className="loading-text">Đang tải...</div>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </PageTransition>
      </main>
      <Suspense fallback={<div className="loading-footer">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default MainLayout;
