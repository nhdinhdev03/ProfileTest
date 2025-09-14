import React, { Suspense, memo, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import { useTheme } from "hooks/useTheme";
import { publicRoutes } from "router";

import ScrollToTopOnNavigate from "components/Scroll/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import ScrollToTop from "components/Scroll/ScrollToTop/ScrollToTop";
import PageTransition from "components/PageTransition/PageTransition";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import "styles/App.scss";
import NotFound from "pages/NotFound";

// Import i18n configuration
import "./i18n";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          padding: '2rem'
        }}>
          <h1>Oops! Something went wrong</h1>
          <p>Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = memo(() => {
  const [theme, toggleTheme] = useTheme("dark");

  // Memoize loading fallback để tối ưu performance
  const loadingFallback = useMemo(() => (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-primary)' 
    }}>
      <LoadingSpinner 
        message="Loading page..." 
        size="medium" 
        variant="truck"
        mobileOptimized={true}
      />
    </div>
  ), []);

  // Render main portfolio view với React Router
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTopOnNavigate />
        <ScrollToTop />
        <Suspense fallback={loadingFallback}>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const LayoutComponent = route.layout ?? MainLayout; // fallback
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutComponent theme={theme} toggleTheme={toggleTheme}>
                      <PageTransition>
                        <Page />
                      </PageTransition>
                    </LayoutComponent>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
});

App.displayName = 'App';

export default App;
