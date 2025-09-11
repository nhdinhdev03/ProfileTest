import React from 'react';
import PropTypes from 'prop-types';

import PageTransition from '../components/PageTransition/PageTransition';
import '../components/PageTransition/PageTransition.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const MainLayout = ({ children, theme, toggleTheme }) => {
  return (
    <div className="App" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default MainLayout;
