import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Header from 'layouts/Header/Header';
import Footer from 'layouts/Footer/Footer';
import Breadcrumb from 'layouts/Breadcrumb/Breadcrumb';

const MainLayout = memo(({ children, theme, toggleTheme, showBreadcrumb = true }) => {
  return (
    <div className="App" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {showBreadcrumb && <Breadcrumb />}
      <main style={{ 
        paddingTop: showBreadcrumb ? '120px' : '70px', // Extra space for breadcrumb
        minHeight: '100vh',
        paddingLeft: 'env(safe-area-inset-left, 0)',
        paddingRight: 'env(safe-area-inset-right, 0)'
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  showBreadcrumb: PropTypes.bool,
};

export default MainLayout;
